import Base from "../common/base-generator";

type License = Wup.License;

export default class PackageLicense extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:license",
        willWrite: ["write:package.json"]
      })
    );
  }

  public initializing(): void {
    try {
      const license: License = this.fs.readJSON(
        this.destinationPath("package.json")
      ).license;

      this.addProp(this.generatorName, license);
    } catch (e) {
      this.addProp(this.generatorName, "UNLICENSED");
    }
  }

  public async prompting(): Promise<void> {
    if (this._mustPrompt) {
      let license = this.getProp(this.generatorName) as License;
      let licenses = license.match(/^\((.*)\)$/);

      if (licenses) {
        licenses = licenses[1].split(/\s+OR\s+/);
      } else {
        licenses = [license];
      }

      const prompts = [
        {
          type: "checkbox",
          name: this.generatorName,
          message: "LICENSE:",
          choices: Array.from(
            new Set(licenses.concat(["MIT", "GPL-3.0", "other"]))
          ),
          default: licenses
        }
      ];

      const props = await this.prompt(prompts);

      licenses = props[this.generatorName] as string[];

      if (licenses.length > 1) {
        license = `(${licenses.join(" OR ")})`;
      } else {
        license = licenses[0];
      }

      this.addProp(this.generatorName, license);
    }
  }
}
