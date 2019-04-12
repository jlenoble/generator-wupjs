import Base from "../common/base-generator";

export default class License extends Base {
  protected static defaultChoices: Wup.License[] = ["MIT", "GPL-3.0", "other"];

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:license",
        willWrite: ["write:package.json"]
      })
    );
  }

  public _toLicense(licenses: Wup.License[]): Wup.License {
    let license: Wup.License;

    if (licenses.length > 1) {
      license = `(${licenses.join(" OR ")})`;
    } else {
      license = licenses[0];
    }

    return license;
  }

  public _toLicenses(license: Wup.License): Wup.License[] {
    let licenses = license.match(/^\((.*)\)$/);

    if (licenses) {
      licenses = licenses[1].split(/\s+OR\s+/);
    } else {
      licenses = [license];
    }

    return licenses;
  }

  public initializing(): void {
    try {
      const license: Wup.License = this.fs.readJSON(
        this.destinationPath("package.json")
      ).license;

      this.addProp(this.generatorName, license);
    } catch (e) {
      this.addProp(this.generatorName, "UNLICENSED");
    }
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      let license = this.getProp(this.generatorName) as Wup.License;
      let licenses = this._toLicenses(license);

      const prompts = [
        {
          type: "checkbox",
          name: this.generatorName,
          message: "LICENSE:",
          choices: Array.from(new Set(licenses.concat(License.defaultChoices))),
          default: licenses
        }
      ];

      const props = await this.prompt(prompts);

      licenses = props[this.generatorName] as string[];
      license = this._toLicense(licenses);

      this.addProp(this.generatorName, license);
    }
  }
}
