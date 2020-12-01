import { MemFsEditor } from "yeoman-generator";
import { EventEmitter } from "events";
import config from "config";
import Property from "./property";
import BaseGenerator from "./base-generator";
import { DepMesh, DepMeshNode } from "organon";

const genName = "generator-wupjs";

type GenName = Wup.GenName;
type Options = Wup.Options;
type Path = Wup.Path;
type PropName = Wup.PropName;
type PropValue = Wup.PropValue;

export default class Config extends EventEmitter {
  protected generatorNodes: DepMesh<BaseGenerator> = new DepMesh({
    create(options): BaseGenerator {
      const name = options.name;

      if (
        options.mesh.has(name) &&
        options.mesh.get(name).value instanceof BaseGenerator
      ) {
        throw new Error(`Creating subgenerator ${name} twice`);
      }

      let gen: BaseGenerator = options.nameOrGen;

      if (gen instanceof BaseGenerator && name === gen.name) {
        return gen;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Method .create() does exist; .env is an instance of Yeoman Environment
        gen = options.env.create(`wupjs:${name}`, options);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore yeoman-test, unlike yo, does not collect subgenerators: fix that!
        options.env.lookup((): void => {
          // noop
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        gen = options.env.create(`wupjs:${name}`, options);
      }

      return gen;
    },
  });
  protected options: Options = {};
  protected properties: Map<PropName, Property> = new Map();

  public constructor(fs: MemFsEditor, destinationPath: (path: Path) => Path) {
    super();

    const yoConfig: Options = fs.readJSON(destinationPath(".yo-rc.json"), {
      [genName]: {},
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

      new DepMeshNode({
        ...this.options,
        name,
        nameOrGen,
        mesh: this.generatorNodes,
      });
    }

    return this;
  }

  public addProp(name: PropName, value: PropValue): this {
    if (this.hasProp(name)) {
      return this.setProp(name, value);
    }

    const prop = new Property({ name, value });

    prop.on("change", (): void => {
      this.emit("change", prop.name);
    });

    this.properties.set(name, prop);

    return this;
  }

  public *generators(): IterableIterator<DepMeshNode<BaseGenerator>> {
    yield* this.generatorNodes.values();
  }

  public getGen(name: GenName): BaseGenerator | undefined {
    const gen: DepMeshNode<BaseGenerator> | undefined = this.generatorNodes.get(
      name
    );
    return gen ? gen.value : undefined;
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
      new DepMeshNode({
        ...this.options,
        ...parent.options,
        name: childGen,
        mesh: this.generatorNodes,
      });
    } else if (child && !parent) {
      new DepMeshNode({
        ...this.options,
        ...child.options,
        name: parentGen,
        mesh: this.generatorNodes,
      });
    }

    parent = this.generatorNodes.get(parentGen) as DepMeshNode<BaseGenerator>;
    child = this.generatorNodes.get(childGen) as DepMeshNode<BaseGenerator>;

    (parent as DepMeshNode<BaseGenerator>).addChild({
      name: (child as DepMeshNode<BaseGenerator>).name,
    });

    return this;
  }

  public reset(): void {
    for (const node of this.generatorNodes.values()) {
      node.value.removeAllListeners();
    }

    for (const prop of this.properties.values()) {
      prop.removeAllListeners();
    }

    this.removeAllListeners();

    this.generatorNodes.clear();
    this.properties.clear();
  }

  public setProp(name: PropName, value: PropValue): this {
    const prop = this.properties.get(name);

    if (prop) {
      prop.value = value;
    }

    return this;
  }
}
