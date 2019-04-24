import fs from "fs-extra";
import Base from "../common/base-generator";

type Path = Wup.Path;

interface Props {
  buildDir: Path;
  libDir: Path;
  gitignores: string;
}

export default class GitIgnore extends Base {
  protected props?: Props;

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:gitignore",
        dependsOn: ["config:paths", "config:targets"]
      })
    );
  }

  public async configure(): Promise<void> {
    const buildDir = this.getProp("config:paths:build") as Path;
    const libDir = this.getProp("config:paths:lib") as Path;
    const includes: Path[] = [];

    if (this.getProp("config:targets:server")) {
      includes.push("gitignore_node");
    }

    let gitignores = "";

    for (const include of includes) {
      try {
        const buffer = await fs.readFile(this.templatePath(include));
        gitignores += "\n" + buffer.toString("utf-8");
      } catch (e) {
        console.log(e);
      }
    }

    this.props = { buildDir, libDir, gitignores };
  }

  public writing(): void {
    this.fs.copyTpl(
      this.templatePath("gitignore.ejs"),
      this.destinationPath(".gitignore"),
      this.props as Props
    );
  }
}