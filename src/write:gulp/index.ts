import path from "path";
import Base from "../common/base-generator";

type Path = Wup.Path;

interface Props {
  gulpIncludes: string[];
  buildDir: string;
  libDir: string;
  gulpDir: string;
  srcGlob: string;
  libGlob: string;
  testGlob: string;
  buildGlob: string;
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

    devDependencies
      .add("plumb-gulp")
      .add("autoreload-gulp")
      .add("gulp-sourcemaps")
      .add("gulp-cached")
      .add("gulp-newer")
      .add("gulp-eslint")
      .add("del")
      .add("gulp-mocha")
      .add("chai");
    noTypes
      .add("plumb-gulp")
      .add("autoreload-gulp")
      .add("gulp-eslint")
      .add("del");
  }

  public configuring(): void {
    const gulpIncludes = [
      "build",
      "clean",
      "test",
      "watch",
      "tdd",
      "lint",
      "dist-build"
    ];

    const buildDir = this.getProp("config:paths:build") as Path;
    const srcDir = this.getProp("config:paths:src") as Path;
    const libDir = this.getProp("config:paths:lib") as Path;
    const testDir = this.getProp("config:paths:test") as Path;
    const gulpDir = this.getProp("config:paths:gulp") as Path;
    const extensions = this.getProp("config:languages:extensions") as string[];

    const globs: string[] = [];
    const srcGlobs: string[] = [];

    extensions.forEach(
      (ext): void => {
        globs.push(path.join(srcDir, "**/*." + ext));
        srcGlobs.push(path.join(srcDir, "**/*." + ext));
        globs.push(path.join(testDir, "**/*." + ext));
      }
    );

    const srcGlob = JSON.stringify(globs, undefined, 2);
    const libGlob = JSON.stringify(srcGlobs, undefined, 2);

    const testGlob = JSON.stringify(
      [path.join(buildDir, testDir, "**/*.test.js")],
      undefined,
      2
    );

    const buildGlob = JSON.stringify(
      [
        path.join(buildDir, srcDir, "**/*.js"),
        path.join(buildDir, testDir, "**/*.js")
      ],
      undefined,
      2
    );

    this.props = {
      gulpIncludes,
      buildDir,
      libDir,
      gulpDir,
      srcGlob,
      libGlob,
      testGlob,
      buildGlob
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
