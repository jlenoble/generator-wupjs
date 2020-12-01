import Base from "../common/base-generator";
import { EslintConfig } from "organon";

export default class EslintRc extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:eslintrc",
        dependsOn: ["config:eslint"],
      })
    );
  }

  public writing(): void {
    if (!this.mustWrite()) {
      return;
    }

    const props = (this.getProp("config:eslint") as unknown) as EslintConfig;

    if (props) {
      this.fs.writeJSON(this.destinationPath(".eslintrc"), props, undefined, 2);
    } else {
      this.log("Failed to write .eslintrc: undefined props");
    }
  }
}
