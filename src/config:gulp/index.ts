import path from "path";
import Base from "../common/base-generator";
import ConfigDependencies from "../config:dependencies";
import { validate } from "../config:paths";
import { GulpConfig } from "organon";

type Path = Wup.Path;

export interface Props extends Wup.Props {
  packageName: string;
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
  distSrcGlob: string;
  distTestGlob: string;

  grammarGlob?: string;
  dataGlob?: string;
  parserSrcGlob?: string;
  parserTokenGlob?: string;

  ipynbGlob: string;

  hasGulpfilesDir: boolean;
  typescript: boolean;
  jupyter: boolean;
  antlr4: boolean;

  grammar: string;
  rule: string;
  listener: string;
  visitor: string;
  parsers: string[];

  filePath: string;
  extensions: string;

  activePackages: string[];
  packageGlobs: { [k: string]: string };

  docConfigFile: string;
  examplesGlob: string;
  relPath: string;
}

export default class Gulp extends Base {
  protected props?: Props;

  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:gulp",
        dependsOn: [
          "config:paths",
          "config:languages",
          "config:dependencies",
          "config:monorepo",
          "config:doc",
        ],
        willWrite: ["write:gulp"],
      })
    );
  }

  public initializing(): void {
    this.addProp(
      this.generatorName + ":hasGulpfilesDir",
      this.config.get("hasGulpfilesDir") || false
    );

    this.addProp(
      "config:paths:gulpfiles",
      this.config.get("gulpfilesDir") ||
        path.join(this.getProp("config:paths:test") as Path, "gulpfiles")
    );
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      let prompts: Wup.Options[] = [
        {
          type: "confirm",
          name: this.generatorName + ":hasGulpfilesDir",
          message: "Do you need a gulpfiles dir?",
          default: this.getProp(
            this.generatorName + ":hasGulpfilesDir"
          ) as boolean,
        },
      ];

      this.addProp(await this.prompt(prompts));

      this.config.set(
        "hasGulpfilesDir",
        this.getProp(this.generatorName + ":hasGulpfilesDir")
      );

      if (this.getProp(this.generatorName + ":hasGulpfilesDir")) {
        prompts = [
          {
            type: "input",
            name: "config:paths:gulpfiles",
            message: "Gulpfiles directory:",
            default: this.getProp("config:paths:gulpfiles") as Path,
            validate,
          },
        ];

        this.addProp(await this.prompt(prompts));

        this.config.set("gulpfilesDir", this.getProp("config:paths:gulpfiles"));
      }
    }
  }

  public configuring(): void {
    const gulp = new GulpConfig({
      babel: true,
      eslint: true,
      gulp: true,
      mocha: true,
      typescript: !!this.getProp("config:languages:typescript"),
    });

    this.addDevDep(gulp.dependencies);

    const packageName = this.getProp("config:package:name") as string;

    const gulpIncludes = [
      "build",
      "clean",
      "test",
      "watch",
      "tdd",
      "lint",
      "dist-build",
      "dist-clean",
      "dist-test",
      "doc",
      "prepublish",
      "push",
      "todo",
    ];

    const buildDir = this.getProp("config:paths:build") as Path;
    const srcDir = this.getProp("config:paths:src") as Path;
    const libDir = this.getProp("config:paths:lib") as Path;
    const testDir = this.getProp("config:paths:test") as Path;
    const gulpDir = this.getProp("config:paths:gulp") as Path;
    const examplesDir = this.getProp("config:paths:examples") as Path;

    const hasGulpfilesDir = this.getProp(
      this.generatorName + ":hasGulpfilesDir"
    ) as boolean;
    const gulpfilesDir = this.getProp("config:paths:gulpfiles") as Path;

    const grammarDir = this.getProp("config:paths:grammar") as Path;
    const dataDir = this.getProp("config:paths:data") as Path;
    const parserDir = this.getProp("config:paths:parser") as Path;
    const listenerDir = this.getProp("config:paths:listener") as Path;
    const visitorDir = this.getProp("config:paths:visitor") as Path;

    const extensions = this.getProp("config:languages:extensions") as string[];

    const typescript = this.getProp("config:languages:typescript") as boolean;
    const jupyter = this.getProp("config:languages:jupyter") as boolean;
    const antlr4 = this.getProp("config:languages:antlr4") as boolean;
    const monorepo = this.getProp("config:monorepo") as boolean;

    const grammar = this.getProp("config:parser:grammar") as string;
    const rule = this.getProp("config:parser:rule") as string;
    const listener = this.getProp("config:parser:listener") as string;
    const visitor = this.getProp("config:parser:visitor") as string;
    const parsers = this.getProp("config:parser:parsers") as string[];

    if (hasGulpfilesDir) {
      gulpIncludes.push("copy-gulpfiles");
    }

    if (typescript) {
      this.addDevDep("gulp-typescript");
      this.addDevDep("@types/node");
      gulpIncludes.push("types");
    }

    if (jupyter) {
      gulpIncludes.push("notebooks");
      this.addDevDep("gulp-exec");
    }

    if (antlr4) {
      gulpIncludes.push("parse");
    }

    if (monorepo) {
      gulpIncludes.push("monorepo");
      this.addDevDep("child-process-data");
    }

    const srcGlobs: string[] = [];
    const libGlobs: string[] = [];
    const examplesGlobs: string[] = [];
    const gulpfilesGlobs: string[] = [];

    extensions.forEach((ext): void => {
      srcGlobs.push(path.join(srcDir, "**/*." + ext));
      srcGlobs.push(path.join(testDir, "**/*." + ext));
      libGlobs.push(path.join(srcDir, "**/*." + ext));
      examplesGlobs.push(path.join(examplesDir, "**/*." + ext));
      gulpfilesGlobs.push(path.join(gulpfilesDir, "**/*." + ext));
    });

    const buildGlobs = [
      path.join(buildDir, srcDir, "**/*.js"),
      path.join(buildDir, testDir, "**/*.js"),
    ];

    if (antlr4) {
      srcGlobs.push("!" + path.join(parserDir, "**/*.js"));
      buildGlobs.push("!" + path.join(buildDir, parserDir, "**/*.js"));
    }

    const srcGlob = JSON.stringify(srcGlobs, undefined, 2);
    const libGlob = JSON.stringify(libGlobs, undefined, 2);
    const examplesGlob = JSON.stringify(examplesGlobs, undefined, 2);
    const gulpfilesGlob = JSON.stringify(gulpfilesGlobs, undefined, 2);

    const testGlob = JSON.stringify(
      [path.join(buildDir, testDir, "**/*.test.js")],
      undefined,
      2
    );

    const buildGlob = JSON.stringify(buildGlobs, undefined, 2);

    const distSrcGlob = JSON.stringify(
      [path.join(libDir, "**/*.js")],
      undefined,
      2
    );

    const distTestGlob = JSON.stringify(
      [path.join(buildDir, examplesDir, "**/*.test.js")],
      undefined,
      2
    );

    const ipynbGlob = JSON.stringify(
      [path.join(srcDir, "**/*.ipynb")],
      undefined,
      2
    );

    let activePackages: string[] = [];
    let packageGlobs: { [k: string]: string } = {};

    if (monorepo) {
      activePackages = [
        ...(this.getProp("config:monorepo:active") as string[]),
      ];
      packageGlobs = {
        ...(this.getProp("config:monorepo:deps") as Record<string, string>),
      };

      Object.keys(packageGlobs).forEach((key): void => {
        packageGlobs[key] = JSON.stringify(packageGlobs[key], undefined, 2);
      });
    }

    const docConfigFile = this.getProp("config:doc:config") as string;

    const relPath = path.relative(path.join(buildDir, examplesDir), libDir);

    this.props = {
      packageName,
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
      distSrcGlob,
      distTestGlob,
      ipynbGlob,

      hasGulpfilesDir,
      typescript,
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
      ),

      activePackages,
      packageGlobs,

      docConfigFile,
      examplesGlob,
      relPath,
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
          path.join(parserDir, "**/*.tokens"),
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
        parserSrcGlob,
      });
    }

    if (hasGulpfilesDir) {
      Object.assign(this.props, {
        gulpfilesGlob,
      });
    }

    this.addProp("config:gulp", this.props);
  }

  public async afterConfiguring(): Promise<void> {
    // Dev deps added by this generator, so wait for all requests to complete
    // and update deps
    await (this.getGen(
      "config:dependencies"
    ) as ConfigDependencies).afterConfiguring();
  }
}
