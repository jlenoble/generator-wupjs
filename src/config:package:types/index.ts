import path from "path";
import Base from "../common/base-generator";

type Path = Wup.Path;

export default class PackageTypes extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:types",
        dependsOn: ["config:paths", "config:languages", "config:package:name"],
        willWrite: ["write:package.json"],
      })
    );
  }

  public initializing(): void {
    try {
      const types: Path | undefined = (this.fs.readJSON(
        this.destinationPath("package.json")
      ) as Wup.PackageJson).types;

      this.addProp(this.generatorName, types);
    } catch (e) {
      this.addProp(this.generatorName, "");
    }
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt && this.getProp("config:languages:typescript")) {
      const types: Path =
        (this.getProp(this.generatorName) as Path) ||
        path.join(
          this.getProp("config:paths:lib") as Path,
          `${this.getProp("config:package:name") || "index"}.d.ts`
        );

      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Package types field:",
          default: types,
        },
      ];

      this.setProp(await this.prompt(prompts));
    }
  }

  public configuring(): void {
    if (!this.getProp("config:languages:typescript")) {
      this.setProp(this.generatorName, "");
    }
  }
}
