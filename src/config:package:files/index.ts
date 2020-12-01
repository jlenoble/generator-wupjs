import Base from "../common/base-generator";

type Path = Wup.Path;

export default class PackageFiles extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:files",
        dependsOn: ["config:paths"],
        willWrite: ["write:package.json"],
      })
    );
  }

  public initializing(): void {
    try {
      const files: Path[] | undefined = ((this.fs.readJSON(
        this.destinationPath("package.json")
      ) as unknown) as Wup.PackageJson).files;

      this.addProp(this.generatorName, files);
    } catch (e) {
      this.addProp(this.generatorName, []);
    }
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      let files: string = ((this.getProp(this.generatorName) ||
        []) as Path[]).join(",");
      if (!files) {
        files = this.getProp("config:paths:lib") as Path;
      }

      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Package files field (comma separated list):",
          default: files,
          filter: (files: string): Path[] => (files || "").split(","),
        },
      ];

      this.setProp(await this.prompt(prompts));
    }
  }
}
