import path from "path";
import Base from "../common/base-generator";

type Path = Wup.Path;

interface Props {
  gulpIncludes: string[];
  buildDir: string;
  gulpDir: string;
  srcGlob: string;
}

export default class Gulp extends Base {
  protected props?: Props;

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:gulp",
        dependsOn: ["config:paths", "config:dependencies"]
      })
    );
  }

  public initializing(): void {
    const devDependencies = this.getProp("config:dependencies:dev") as Set<
      string
    >;
    const noTypes = this.getProp("config:dependencies:no-types") as Set<string>;

    devDependencies.add("plumb-gulp").add("autoreload-gulp");
    noTypes.add("plumb-gulp").add("autoreload-gulp");
  }

  public configuring(): void {
    const gulpIncludes = ["build"];
    const buildDir = `${this.getProp("config:paths:build") as Path}`;
    const gulpDir = `${this.getProp("config:paths:gulp") as Path}`;
    const srcGlob = JSON.stringify(
      [
        path.join(this.getProp("config:paths:src") as Path, "**/*.ts"),
        path.join(this.getProp("config:paths:test") as Path, "**/*.ts")
      ],
      undefined,
      2
    );

    this.props = {
      gulpIncludes,
      buildDir,
      gulpDir,
      srcGlob
    };
  }

  public writing(): void {
    const props: Props = this.props as Props;
    const gulpDir: Path = this.getProp("config:paths:gulp") as Path;

    this.fs.copyTpl(
      this.templatePath("gulpfile.ejs"),
      this.destinationPath("gulpfile.babel.js"),
      props
    );

    props.gulpIncludes.forEach(
      (include): void => {
        this.fs.copyTpl(
          this.templatePath(`${include}.ejs`),
          this.destinationPath(path.join(gulpDir, `${include}.js`)),
          props
        );
      }
    );
  }
}
