import Base from "../common/base-generator";
import { BabelConfig } from "organon";

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

  public async configure(): Promise<void> {
    this.props = new BabelConfig({
      babel: true,
      node: this.getProp("config:targets:server") ? "current" : false,
      typescript: !!this.getProp("config:languages:typescript")
    });
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
