import Base from "../common/base-generator";

export default class License extends Base {
  protected static defaultChoices: Wup.License[] = [
    "MIT",
    "GPL-3.0",
    "SEE IN FILE"
  ];

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:license",
        willWrite: ["write:package.json", "write:LICENSE"]
      })
    );
  }

  public _toLicense(licenses: Wup.License[]): Wup.License {
    let license: Wup.License;

    if (licenses.length > 1) {
      license = `(${licenses
        .filter((license): boolean => license !== "UNLICENSED")
        .join(" OR ")})`;
    } else {
      license = licenses[0] || "UNLICENSED";
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
          choices: Array.from(
            new Set(
              licenses
                .concat(License.defaultChoices)
                .filter((license): boolean => license !== "UNLICENSED")
            )
          ),
          default: licenses
        }
      ];

      let props = await this.prompt(prompts);

      licenses = props[this.generatorName] as string[];
      const idx = licenses.indexOf("SEE IN FILE");

      if (idx !== -1) {
        props = await this.prompt([
          {
            type: "input",
            name: this.generatorName + ":SEE",
            message: "Enter your custom license file name",
            default: "LICENSE"
          }
        ]);

        licenses[idx] = `SEE IN FILE ${props[this.generatorName + ":SEE"]}`;
      }

      license = this._toLicense(licenses);

      if (license === "UNLICENSED") {
        this.addProp("config:package:private", true);
      }

      this.addProp(this.generatorName, license);
    }
  }
}
