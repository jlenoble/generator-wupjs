import path from "path";
import Base from "../common/base-generator";
import prettyWrite from "../common/pretty-write";
import { Props } from "../config:gulp";

type Path = Wup.Path;

export default class WritingGulp extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:gulp",
        dependsOn: ["config:gulp"]
      })
    );
  }

  public writing(): void {
    if (!this.mustWrite()) {
      return;
    }

    const props: Props = this.getProp("config:gulp") as Props;
    const gulpDir: Path = this.getProp("config:paths:gulp") as Path;

    prettyWrite(
      this,
      props,
      this.templatePath("gulpfile.ejs"),
      this.destinationPath("gulpfile.babel.js")
    );

    props.gulpIncludes.forEach(
      (include): void => {
        prettyWrite(
          this,
          props,
          this.templatePath(`${include}.ejs`),
          this.destinationPath(path.join(gulpDir, `${include}.js`))
        );
      }
    );
  }
}
