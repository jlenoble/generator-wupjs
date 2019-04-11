import { Editor } from "mem-fs-editor";
import Generator from "yeoman-generator";
import chalk from "chalk";
import Config from "./config";

type GenName = Wup.GenName;
type PropName = Wup.PropName;
type PropValue = Wup.PropValue;
type Options = Wup.Options;
type Props = Wup.Props;

let config: Config;

export default class BaseGenerator extends Generator
  implements Wup.BaseGenerator {
  public readonly generatorName: GenName;
  protected mustPrompt: boolean;

  private static calledGenerator: BaseGenerator | null = null;

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

    if (!config) {
      config = new Config(this.fs as Editor, this.destinationPath.bind(this));
    }

    if (generatorName) {
      this.generatorName = generatorName;
    } else {
      throw new Error("You forgot to name your subgenerator");
    }

    this.mustPrompt = true;

    console.log("***INSTANTIATING", generatorName);

    if (!BaseGenerator.calledGenerator) {
      BaseGenerator.calledGenerator = this;
    }

    config.addGen(this);

    if (BaseGenerator.calledGenerator === this) {
      config.linkGens("config:auto", generatorName);
    }

    for (const genName of willWrite) {
      config.linkGens(generatorName, genName);
    }

    for (const genName of dependsOn) {
      config.linkGens(genName, generatorName);
    }

    this.composeAll();
  }

  public addProp(name: PropName | Props, value?: PropValue): this {
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
        config.addProp(name, props[name]);
      }
    );

    return this;
  }

  public composeAll(): void {
    if (BaseGenerator.calledGenerator === this) {
      let prompt = true;

      for (const { generator } of config.generators()) {
        if (generator === this) {
          // All ancestors have been treated, now dealing with descendants:
          // Stop prompting the user but configure using the gathered parameters.
          prompt = false;
          continue;
        }

        console.log(
          `***COMPOSING ${this.generatorName} with ${generator.generatorName}`
        );

        generator.mustPrompt = prompt;

        // ._composedWith: Accessing parent internal on purpose.
        // We don't rely on Yeoman to build the dependency mesh of our
        // subgenerators but instanciate them as needed by hand during the
        // linking process; This prevents from being prompted again and again
        // for the same parameters.
        // @ts-ignore
        this._composedWith.push(generator);
      }
    }
  }

  public composeWith(): this {
    throw new Error(
      chalk.red(`
Don't use .composeWith() super method;
Use options dependsOn and willWrite instead in constructor to grow the
dependency mesh of your subgenerators and thus prevent being plagued by
redundant prompting.
`)
    );
  }

  public getProp(name: PropName): PropValue | undefined {
    return config.getProp(name);
  }

  public setProp(name: PropName | Props, value?: PropValue): this {
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

    return this;
  }
}
