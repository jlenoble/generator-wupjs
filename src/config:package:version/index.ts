import semver from "semver";
import Base from "../common/base-generator";

type Version = Wup.Version;

export default class PackageVersion extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:version",
        willWrite: ["write:package.json"]
      })
    );
  }

  protected _isValid(props: Wup.Options): boolean {
    const version: Version = props[this.generatorName] as Version;
    return !!semver.valid(version);
  }

  public initializing(): void {
    try {
      const version: Version = this.fs.readJSON(
        this.destinationPath("package.json")
      ).version;

      this.addProp(this.generatorName, version);
    } catch (e) {}
  }

  public async prompting(): Promise<void> {
    if (this._mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Package version:",
          default: this.getProp(this.generatorName) || "0.0.0"
        }
      ];

      const props = await this.prompt(prompts);

      if (this._isValid(props)) {
        this.addProp(props);
        return;
      }

      return this.prompting();
    }
  }
}
