import Base from "../common/base-generator";

type Dependencies = Wup.Dependencies;

interface Props {
  presets: any;
  plugins: any;
}

export default class BabelRc extends Base {
  protected props?: Props;

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:babelrc",
        dependsOn: ["config:dev"]
      })
    );
  }

  protected _handlePresetEnv(presets: any[]): void {
    const targets: Wup.Options = {};

    if (this.getProp("config:targets:server")) {
      targets.node = "current";
    }

    if (Object.keys(targets).length) {
      presets.push([
        "@babel/preset-env",
        {
          targets
        }
      ]);
    } else {
      presets.push("@babel/preset-env");
    }
  }

  public async configure(): Promise<void> {
    const presets: any[] = [];
    const plugins: any[] = [];

    const devDependencies = this.getProp("config:dependencies:dev") as Set<
      string
    >;

    devDependencies.forEach(
      (dep): void => {
        switch (dep) {
          case "@babel/preset-env":
            this._handlePresetEnv(presets);
            break;

          default:
            if (dep.includes("@babel/preset-")) {
              presets.push(dep);
            }
        }
      }
    );

    this.props = {
      presets: JSON.stringify(presets, undefined, 2),
      plugins: JSON.stringify(plugins, undefined, 2)
    };
  }

  public writing(): void {
    this.fs.copyTpl(
      this.templatePath("babelrc.ejs"),
      this.destinationPath(".babelrc"),
      this.props as Props
    );
  }
}
