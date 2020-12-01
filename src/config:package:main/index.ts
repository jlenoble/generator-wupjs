import path from "path";
import Base from "../common/base-generator";

type Path = Wup.Path;

export default class PackageMain extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:main",
        dependsOn: ["config:paths"],
        willWrite: ["write:package.json"],
      })
    );
  }

  public initializing(): void {
    try {
      const main: Path | undefined = (this.fs.readJSON(
        this.destinationPath("package.json")
      ) as Wup.PackageJson).main;

      this.addProp(this.generatorName, main);
    } catch (e) {
      this.addProp(this.generatorName, "");
    }
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const main: Path =
        (this.getProp(this.generatorName) as Path) ||
        path.join(
          this.getProp("config:paths:lib") as Path,
          `${this.getProp("config:package:name") || "index"}.js`
        );

      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Package main entry:",
          default: main,
        },
      ];

      this.setProp(await this.prompt(prompts));
    }
  }
}
