import { Editor } from "mem-fs-editor";
import EventEmitter from "events";
import config from "config";
import Property from "./property";
import GeneratorNode from "./generator-node";
import BaseGenerator from "./base-generator";

const genName = "generator-wupjs";

type GenName = Wup.GenName;
type Options = Wup.Options;
type Path = Wup.Path;
type PropName = Wup.PropName;
type PropValue = Wup.PropValue;
type Props = Wup.Props;

export default class Config extends EventEmitter implements Wup.Config {
  protected generatorNodes: Map<GenName, GeneratorNode> = new Map();
  protected options: Options = {};
  protected properties: Map<PropName, Property> = new Map();

  public constructor(fs: Editor, destinationPath: (path: Path) => Path) {
    super();

    const yoConfig: Props = fs.readJSON(destinationPath(".yo-rc.json"), {
      [genName]: {}
    });

    Object.entries(yoConfig[genName]).forEach(
      ([name, value]: [PropName, PropValue]): void => {
        this.addProp(name, value);
      }
    );
  }

  public addGen(nameOrGen: GenName | BaseGenerator): this {
    const name =
      typeof nameOrGen === "string" ? nameOrGen : nameOrGen.generatorName;

    if (!this.generatorNodes.has(name)) {
      if (typeof nameOrGen == "object") {
        // Then nameOrGen is the called subgenerator object, not a dependency name
        Object.assign(this.options, nameOrGen.options);
      }

      this.generatorNodes.set(
        name,
        new GeneratorNode(nameOrGen, this.generatorNodes, this.options)
      );
    }

    return this;
  }

  public addProp(name: PropName, value: PropValue): this {
    if (this.hasProp(name)) {
      return this.setProp(name, value);
    }

    const prop = new Property({ name, value });

    prop.on(
      "change",
      (): void => {
        this.emit("change", prop.name);
      }
    );

    this.properties.set(name, prop);

    return this;
  }

  public *generators(): IterableIterator<GeneratorNode> {
    yield* GeneratorNode.generators(this.generatorNodes.values());
  }

  public getGen(name: GenName): BaseGenerator | undefined {
    const gen: GeneratorNode | undefined = this.generatorNodes.get(name);
    return gen ? gen.generator : undefined;
  }

  public getProp(name: PropName): PropValue | undefined {
    let prop: Property | undefined = this.properties.get(name);

    if (prop === undefined && config.has(name)) {
      const value: PropValue = config.get(name);

      if (value !== undefined) {
        this.addProp(name, value);
        prop = this.properties.get(name);
      }
    }

    return prop ? prop.value : undefined;
  }

  public hasProp(name: PropName): boolean {
    return this.properties.has(name);
  }

  public linkGens(parentGen: GenName, childGen: GenName): this {
    let parent = this.generatorNodes.get(parentGen);
    let child = this.generatorNodes.get(childGen);

    if (!parent && !child) {
      throw new Error(
        "To link two subgenerators, one at least must already exist"
      );
    } else if (parent && !child) {
      parent.createGen(childGen);
      child = this.generatorNodes.get(childGen) as GeneratorNode;
    } else if (child && !parent) {
      child.createGen(parentGen);
      parent = this.generatorNodes.get(parentGen) as GeneratorNode;
    }

    (parent as GeneratorNode).addChild((child as GeneratorNode).name);

    return this;
  }

  public setProp(name: PropName, value: PropValue): this {
    const prop = this.properties.get(name);

    if (prop) {
      prop.value = value;
    }

    return this;
  }
}
