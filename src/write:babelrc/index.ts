import Base from "../common/base-generator";

import { Deps } from "../config:config:dependencies";

interface Props {
  presets: any[];
  plugins: any[];
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

    const devDependencies = (this.getProp("config:dependencies") as Deps)
      .devDependencies;

    Object.keys(devDependencies).forEach(
      (dep): void => {
        switch (dep) {
          case "@babel/preset-env":
            this._handlePresetEnv(presets);
            break;

          case "@babel/preset-typescript":
            presets.push([dep, { allExtensions: true }]);
            break;

          case "@babel/plugin-proposal-decorators":
            plugins.push([dep, { decoratorsBeforeExport: true }]);
            break;

          default:
            if (dep.includes("@babel/preset-")) {
              presets.push(dep);
            }
            if (
              dep.includes("@babel/plugin-") ||
              dep.includes("babel-plugin-")
            ) {
              plugins.push(dep);
            }
        }
      }
    );

    this.props = {
      presets,
      plugins
    };
  }

  public writing(): void {
    if (!this.mustWrite()) {
      return;
    }

    if (this.props) {
      this.fs.writeJSON(
        this.destinationPath(".babelrc"),
        this.props,
        undefined,
        2
      );
    } else {
      this.log("Failed to write .babelrc: undefined props");
    }
  }
}
