import path from "path";
import fs from "fs-extra";
import Base from "../common/base-generator";

type Path = Wup.Path;

interface Props {
  buildDir: Path;
  libDir: Path;
  docDir: Path;
  gulpDir: Path;
  gitignores: string;
  antlr4: boolean;
  parserDir: Path;
}

export default class GitIgnore extends Base {
  protected props?: Props;

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:gitignore",
        dependsOn: ["config:paths", "config:targets", "config:languages"]
      })
    );
  }

  public async configure(): Promise<void> {
    const buildDir = this.getProp("config:paths:build") as Path;
    const libDir = this.getProp("config:paths:lib") as Path;
    const docDir = this.getProp("config:paths:doc") as Path;
    const gulpDir = this.getProp("config:paths:gulp") as Path;

    const includes: Path[] = [];
    const antlr4 =
      (this.getProp("config:languages:antlr4") as boolean) || false;
    const parserDir = this.getProp("config:paths:parser") as Path;

    if (this.getProp("config:targets:server")) {
      includes.push(
        path.join(__dirname, "../..", buildDir, "gitignore", "Node.gitignore")
      );
    }

    if (this.getProp("config:languages:jupyter")) {
      includes.push(
        path.join(__dirname, "../..", buildDir, "gitignore", "Python.gitignore")
      );
    }

    let gitignores = "";

    for (const include of includes) {
      try {
        const buffer = await fs.readFile(include);
        gitignores += "\n" + buffer.toString("utf-8");
      } catch (e) {
        console.log(e);
      }
    }

    this.props = {
      buildDir,
      libDir,
      docDir,
      gulpDir,
      gitignores,
      antlr4,
      parserDir
    };
  }

  public writing(): void {
    if (!this.mustWrite()) {
      return;
    }

    this.fs.copyTpl(
      this.templatePath("gitignore.ejs"),
      this.destinationPath(".gitignore"),
      this.props as Props
    );
  }
}
