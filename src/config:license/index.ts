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

  public _toChoices(licenses: Wup.License[]): Wup.License[] {
    const choices = [...License.defaultChoices];
    const idx = choices.indexOf("SEE IN FILE");

    if (licenses.some((license): boolean => license.includes("SEE IN FILE"))) {
      choices.splice(idx, 1);
    }

    return Array.from(
      new Set(
        licenses
          .filter((license): boolean => license !== "UNLICENSED")
          .concat(choices)
      )
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
          choices: this._toChoices(licenses),
          default: licenses
        }
      ];

      let props = await this.prompt(prompts);

      licenses = props[this.generatorName] as string[];
      const idx = licenses.findIndex(
        (license): boolean => license.includes("SEE IN FILE")
      );

      if (idx !== -1) {
        const match = licenses[idx].match(/SEE IN FILE (.*)/);

        const prompts = [
          {
            type: "input",
            name: this.generatorName + ":SEE",
            message: "Enter your custom license file name",
            default: match && match[1] !== "LICENSE" ? match[1] : "CUSTOM"
          }
        ];

        let file: Wup.Name;

        while (true) {
          props = await this.prompt(prompts);

          file = props[this.generatorName + ":SEE"].trim();

          if (file === "LICENSE") {
            this.log(`LICENSE will be overwritten by this generator.
Change your custom license file name.`);
          } else {
            break;
          }
        }

        licenses[idx] = `SEE IN FILE ${file}`;
      }

      license = this._toLicense(licenses);

      if (license === "UNLICENSED") {
        this.addProp("config:package:private", true);
      }

      this.addProp(this.generatorName, license);
    }
  }
}
