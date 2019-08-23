import Generator from "yeoman-generator";
import chalk from "chalk";
import Config from "./config";
import RefDeps from "./ref-deps";

type GenName = Wup.GenName;
type PropName = Wup.PropName;
type PropValue = Wup.PropValue;
type Options = Wup.Options;
type Props = Wup.Props;

let config: Config | null;
let refDeps: RefDeps | null;

export default class BaseGenerator extends Generator
  implements Wup.BaseGenerator {
  public readonly generatorName: GenName;
  protected mustPrompt: boolean;

  public get name(): string {
    return this.generatorName;
  }

  private static calledGenerator: BaseGenerator | null = null;
  protected static refDeps: RefDeps | null = null;

  public static reset(): void {
    if (config) {
      (config as Config).reset();
      config = null;
    }

    BaseGenerator.calledGenerator = null;
  }

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
      config = new Config(this.fs, this.destinationPath.bind(this));
    }

    if (!refDeps) {
      refDeps = new RefDeps(this.fs);
    }

    if (generatorName) {
      this.generatorName = generatorName;
    } else {
      throw new Error("You forgot to name your subgenerator");
    }

    this.mustPrompt = true;

    if (!BaseGenerator.calledGenerator) {
      BaseGenerator.calledGenerator = this;
      BaseGenerator.refDeps = refDeps;
    }

    (config as Config).addGen(this);

    if (BaseGenerator.calledGenerator === this) {
      (config as Config).linkGens("config:auto", generatorName);
    }

    for (const genName of willWrite) {
      (config as Config).linkGens(generatorName, genName);
    }

    for (const genName of dependsOn) {
      (config as Config).linkGens(genName, generatorName);
    }

    this.on("dependsOn", (name: GenName): void => {
      (config as Config).linkGens(name, this.generatorName);
      const calledGen = BaseGenerator.calledGenerator as BaseGenerator;
      const gen = this.getGen(name) as BaseGenerator;

      gen.destinationRoot(calledGen.destinationRoot());

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore Intentional access to internal
      calledGen._composedWith.length = 0;
      calledGen.composeAll();
    });

    this.composeAll();
  }

  protected _addDep(name: string, version = "*"): void {
    throw new Error(
      chalk.red(`
Don't use ._addDep(${name}, ${version}) super method;
Call .addDep(${name}, ${version}) and delegate to "config:dependencies" subgen
`)
    );
  }

  protected _addDevDep(name: string, version = "*"): void {
    throw new Error(
      chalk.red(`
Don't use ._addDevDep(${name}, ${version}) super method;
Call .addDevDep(${name}, ${version}) and delegate to "config:dependencies" subgen
`)
    );
  }

  protected _addPeerDep(name: string, version = "*"): void {
    throw new Error(
      chalk.red(`
Don't use ._addPeerDep(${name}, ${version}) super method;
Call .addPeerDep(${name}, ${version}) and delegate to "config:dependencies" subgen
`)
    );
  }

  public addDep(name: string | Wup.Dependencies, version = "*"): void {
    // Make every subgen able to add deps on the fly
    const gen = this.getGen("config:dependencies");

    if (!gen) {
      console.warn(
        "Calling addDep too early, config:dependencies subgen not registered"
      );
      return;
    }

    if (typeof name === "object") {
      Object.entries(name).forEach(([key, val]): void => {
        gen._addDep(key, val);
      });
    } else {
      gen._addDep(name, version);
    }
  }

  public addDevDep(name: string | Wup.Dependencies, version = "*"): void {
    // Make every subgen able to add dev deps on the fly
    const gen = this.getGen("config:dependencies");

    if (!gen) {
      console.warn(
        "Calling addDevDep too early, config:dependencies subgen not registered"
      );
      return;
    }

    if (typeof name === "object") {
      Object.entries(name).forEach(([key, val]): void => {
        gen._addDevDep(key, val);
      });
    } else {
      gen._addDevDep(name, version);
    }
  }

  public addPeerDep(name: string | Wup.Dependencies, version = "*"): void {
    // Make every subgen able to add peer deps on the fly
    const gen = this.getGen("config:dependencies");

    if (!gen) {
      console.warn(
        "Calling addPeerDep too early, config:dependencies subgen not registered"
      );
      return;
    }

    if (typeof name === "object") {
      Object.entries(name).forEach(([key, val]): void => {
        gen._addPeerDep(key, val);
      });
    } else {
      gen._addPeerDep(name, version);
    }
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

    Object.keys(props).forEach((name): void => {
      (config as Config).addProp(name, props[name]);
    });

    return this;
  }

  public composeAll(): void {
    if (BaseGenerator.calledGenerator === this) {
      let prompt = true;

      for (const { value } of (config as Config).generators()) {
        const generator = value;

        if (generator === this) {
          // All ancestors have been treated, now dealing with descendants:
          // Stop prompting the user but configure using the gathered parameters.
          prompt = false;
          continue;
        }

        console.log(
          `*** COMPOSING ${chalk.cyan(
            this.generatorName
          )} with              ${chalk.yellow(generator.generatorName)}
    will${
      prompt ? "     " : chalk.magenta("  NOT")
    } init or prompt for ${" ".repeat(this.generatorName.length)}${chalk.yellow(
            generator.generatorName
          )}`
        );

        generator.mustPrompt = prompt;

        // ._composedWith: Accessing parent internal on purpose.
        // We don't rely on Yeoman to build the dependency mesh of our
        // subgenerators but instanciate them as needed by hand during the
        // linking process; This prevents from being prompted again and again
        // for the same parameters.
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this._composedWith.push(generator);

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore Accessing internals to start gens added after prompting or configuring
        if (this._running && !generator._running) {
          generator.run();
        }
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

  public getGen(name: GenName): BaseGenerator | undefined {
    return (config as Config).getGen(name);
  }

  public getProp(name: PropName): PropValue | undefined {
    return (config as Config).getProp(name);
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

    Object.keys(props).forEach((name): void => {
      (config as Config).setProp(name, props[name]);
    });

    return this;
  }

  public mustWrite(): boolean {
    return this.options.dependsOn.some((name: GenName): boolean => {
      return (this.getGen(name) as BaseGenerator).mustPrompt;
    });
  }
}
