import path from "path";
import fs from "fs-extra";
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
        dependsOn: ["config:gulp", "config:doc"]
      })
    );
  }

  public _collectCustom(
    dir: string,
    stems: ReadonlyArray<string>
  ): ReadonlyArray<string> {
    const files = [];

    try {
      for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        const stats = fs.lstatSync(fullPath);

        if (stats.isFile()) {
          files.push(file);
        }
      }
    } catch (e) {}

    return files
      .map(
        (file): string => {
          return path.basename(file, ".js");
        }
      )
      .filter(
        (stem): boolean => {
          return !stems.includes(stem);
        }
      );
  }

  public async writing(): Promise<void> {
    if (!this.mustWrite()) {
      return;
    }

    const props: Props = this.getProp("config:gulp") as Props;
    const gulpDir: Path = this.getProp("config:paths:gulp") as Path;

    prettyWrite(
      this,
      {
        ...props,
        gulpIncludes: props.gulpIncludes.concat(
          this._collectCustom(this.destinationPath(gulpDir), props.gulpIncludes)
        )
      },
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

    if (this.getProp("config:gulp:hasGulpfilesDir")) {
      const gulpfilesDir: Path = this.getProp("config:paths:gulpfiles") as Path;

      let found = true;

      try {
        await fs.stat(this.destinationPath(gulpfilesDir));
      } catch (e) {
        found = false;
      }

      if (!found) {
        prettyWrite(
          this,
          props,
          this.templatePath("gulpfile-example.ejs"),
          this.destinationPath(path.join(gulpfilesDir, "gulpfile.js"))
        );
      }
    }
  }
}
