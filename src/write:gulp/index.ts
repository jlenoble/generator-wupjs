import path from "path";
import Base from "../common/base-generator";

type Path = Wup.Path;

interface Props {
  gulpIncludes: string[];

  srcDir: string;
  buildDir: string;
  libDir: string;
  gulpDir: string;

  grammarDir: string;
  dataDir: string;
  parserDir: string;
  listenerDir: string;
  visitorDir: string;

  srcGlob: string;
  libGlob: string;
  testGlob: string;
  buildGlob: string;

  grammarGlob?: string;
  dataGlob?: string;
  parserSrcGlob?: string;
  parserTokenGlob?: string;

  ipynbGlob: string;

  jupyter: boolean;
  antlr4: boolean;

  grammar: string;
  rule: string;
  listener: string;
  visitor: string;
  parsers: string[];

  filePath: string;
  extensions: string;
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
      "dist-build",
      "dist-clean"
    ];

    const buildDir = this.getProp("config:paths:build") as Path;
    const srcDir = this.getProp("config:paths:src") as Path;
    const libDir = this.getProp("config:paths:lib") as Path;
    const testDir = this.getProp("config:paths:test") as Path;
    const gulpDir = this.getProp("config:paths:gulp") as Path;

    const grammarDir = this.getProp("config:paths:grammar") as Path;
    const dataDir = this.getProp("config:paths:data") as Path;
    const parserDir = this.getProp("config:paths:parser") as Path;
    const listenerDir = this.getProp("config:paths:listener") as Path;
    const visitorDir = this.getProp("config:paths:visitor") as Path;

    const extensions = this.getProp("config:languages:extensions") as string[];

    const jupyter = this.getProp("config:languages:jupyter") as boolean;
    const antlr4 = this.getProp("config:languages:antlr4") as boolean;

    const grammar = this.getProp("config:parser:grammar") as string;
    const rule = this.getProp("config:parser:rule") as string;
    const listener = this.getProp("config:parser:listener") as string;
    const visitor = this.getProp("config:parser:visitor") as string;
    const parsers = this.getProp("config:parser:parsers") as string[];

    if (jupyter) {
      gulpIncludes.push("notebooks");
      this.addDevDep("gulp-exec", false);
    }

    if (antlr4) {
      gulpIncludes.push("parse");
    }

    const srcGlobs: string[] = [];
    const libGlobs: string[] = [];

    extensions.forEach(
      (ext): void => {
        srcGlobs.push(path.join(srcDir, "**/*." + ext));
        srcGlobs.push(path.join(testDir, "**/*." + ext));
        libGlobs.push(path.join(srcDir, "**/*." + ext));
      }
    );

    const buildGlobs = [
      path.join(buildDir, srcDir, "**/*.js"),
      path.join(buildDir, testDir, "**/*.js")
    ];

    if (antlr4) {
      srcGlobs.push("!" + path.join(parserDir, "**/*.js"));
      buildGlobs.push("!" + path.join(buildDir, parserDir, "**/*.js"));
    }

    const srcGlob = JSON.stringify(srcGlobs, undefined, 2);
    const libGlob = JSON.stringify(libGlobs, undefined, 2);

    const testGlob = JSON.stringify(
      [path.join(buildDir, testDir, "**/*.test.js")],
      undefined,
      2
    );

    const buildGlob = JSON.stringify(buildGlobs, undefined, 2);

    const ipynbGlob = JSON.stringify(
      [path.join(srcDir, "**/*.ipynb")],
      undefined,
      2
    );

    this.props = {
      gulpIncludes,

      srcDir,
      buildDir,
      libDir,
      gulpDir,

      grammarDir,
      dataDir,
      parserDir,
      listenerDir,
      visitorDir,

      srcGlob,
      libGlob,
      testGlob,
      buildGlob,
      ipynbGlob,

      jupyter,
      antlr4,

      grammar,
      rule,
      listener,
      visitor,
      parsers,

      filePath: "<%- file.path %>",
      extensions: JSON.stringify(
        extensions.map((ext): string => "." + ext),
        undefined,
        2
      )
    };

    if (antlr4) {
      const grammarGlob = JSON.stringify(
        [path.join(grammarDir, "**/*.g4")],
        undefined,
        2
      );
      const dataGlob = JSON.stringify(
        [path.join(dataDir, "**/*")],
        undefined,
        2
      );
      const parserTokenGlob = JSON.stringify(
        [
          path.join(parserDir, "**/*.interp"),
          path.join(parserDir, "**/*.tokens")
        ],
        undefined,
        2
      );
      const parserSrcGlob = JSON.stringify(
        [path.join(parserDir, "**/*.js")],
        undefined,
        2
      );

      Object.assign(this.props, {
        grammarGlob,
        dataGlob,
        parserTokenGlob,
        parserSrcGlob
      });
    }
  }

  public writing(): void {
    if (!this.mustWrite()) {
      return;
    }

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
