import semver from "semver";
import Base from "../common/base-generator";

type Version = Wup.Version;

export default class PackageVersion extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:version",
        willWrite: ["write:package.json"],
      })
    );
  }

  public initializing(): void {
    try {
      const version: Version | undefined = ((this.fs.readJSON(
        this.destinationPath("package.json")
      ) as unknown) as Wup.PackageJson).version;

      this.addProp(this.generatorName, version);
    } catch (e) {
      this.addProp(this.generatorName, "0.0.0");
    }
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Package version:",
          default: this.getProp(this.generatorName) || "0.0.0",
          validate: (version: Version): true | string => {
            if (!semver.valid(version)) {
              return "Version format doesn't follow SemVer: 1.2.3(-4|-alpha.5|-beta.6)";
            }

            return true;
          },
        },
      ];

      this.setProp(await this.prompt(prompts));
    }
  }
}
