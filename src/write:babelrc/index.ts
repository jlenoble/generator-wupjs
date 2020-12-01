import Base from "../common/base-generator";
import { BabelConfig } from "organon";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  presets: (string | [string, any])[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: (string | [string, any])[];
}

export default class BabelRc extends Base {
  protected props?: Props;

  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:babelrc",
        dependsOn: ["config:dev"],
      })
    );
  }

  public async configuring(): Promise<void> {
    const babel = new BabelConfig({
      babel: true,
      node: (this.config.get("prodModuleTypes") || []).includes("CommonJS")
        ? "current"
        : false,
      typescript: !!this.getProp("config:languages:typescript"),
    });

    this.addDevDep(babel.dependencies);

    this.props = babel;
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
