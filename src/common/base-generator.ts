import Generator from "yeoman-generator";
import Config from "./config";

type GenName = Wup.GenName;
type PropName = Wup.PropName;
type PropValue = Wup.PropValue;
type Options = Wup.Options;
type Props = Wup.Props;

const config = new Config();

export default class BaseGenerator extends Generator
  implements Wup.BaseGenerator {
  public readonly generatorName: GenName;

  public constructor(args: string | string[], options: Options = {}) {
    const {
      generatorName,
      willWrite = [],
      dependsOn = []
    }: {
      generatorName?: GenName;
      willWrite?: GenName[];
      dependsOn?: GenName[];
    } = options;

    super(args, options);

    if (generatorName) {
      this.generatorName = generatorName;
    } else {
      throw new Error("You forgot to name your subgenerator");
    }

    config.addGen(this);

    for (const genName of willWrite) {
      config.linkGens(generatorName, genName);
    }

    for (const genName of dependsOn) {
      config.linkGens(genName, generatorName);
    }
  }

  public getProp(name: PropName): PropValue | undefined {
    return config.getProp(name);
  }

  public setProp(name: PropName | Props, value?: PropValue): void {
    let props: Props;

    if (typeof name === "object") {
      props = name;
    } else if (value !== undefined) {
      props = { [name]: value };
    } else {
      throw new Error(`Cannot assign value ${value} to key ${name}`);
    }

    Object.keys(props).forEach(
      (name): void => {
        config.setProp(name, props[name]);
      }
    );
  }
}
