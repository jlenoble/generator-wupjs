import chalk from "chalk";
import Base from "../common/base-generator";

export default class License extends Base {
  protected static defaultChoices: Wup.License[] = [
    "AGPL-3.0",
    "APACHE-2.0",
    "BSD-2-CLAUSE",
    "BSD-3-CLAUSE",
    "CC-BY-SA-4.0",
    "EUPL-1.2",
    "GPL-2.0",
    "GPL-3.0",
    "ISC",
    "LGPL-2.1",
    "LGPL-3.0",
    "MIT",
    "SEE IN FILE",
  ];

  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:license",
        willWrite: ["write:package.json", "write:LICENSE"],
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
          .map(this._unsuffixGPL)
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
      const license: Wup.License | undefined = ((this.fs.readJSON(
        this.destinationPath("package.json")
      ) as unknown) as Wup.PackageJson).license;

      this.addProp(this.generatorName, license);
    } catch (e) {
      this.addProp(this.generatorName, "UNLICENSED");
    }
  }

  public _suffixGPL(license: Wup.License): Wup.License {
    const gpl = this.getProp(this.generatorName + ":GPL-suffix");
    return license
      .replace(/(GPL-\d\.\d)/g, `$&${gpl || ""}`)
      .replace("-only-", "-")
      .replace("-or-later-", "-");
  }

  public _unsuffixGPL(license: Wup.License): Wup.License {
    return license.replace(/(-only|-or-later)/g, "");
  }

  public async _promptingIfGPL(licenses: Wup.License[]): Promise<void> {
    const idx = licenses.findIndex((license): boolean =>
      license.includes("GPL-")
    );

    if (idx !== -1) {
      const name = this.generatorName + ":GPL-suffix";

      const prompts = [
        {
          type: "confirm",
          name,
          message: `May a user apply a later version of the GPL terms and conditions?`,
          default: false,
        },
      ];

      const props = await this.prompt(prompts);
      this.addProp(name, props[name] ? "-or-later" : "-only");
    }
  }

  public async _promptingIfSeeInFile(
    licenses: Wup.License[]
  ): Promise<Wup.License[]> {
    const res = [...licenses];

    const idx = licenses.findIndex((license): boolean =>
      license.includes("SEE IN FILE")
    );

    if (idx !== -1) {
      const name = this.generatorName + ":SEE";
      const match = licenses[idx].match(/SEE IN FILE (.*)/);

      const prompts = [
        {
          type: "input",
          name,
          message: "Enter your custom license file name",
          default: match && match[1] !== "LICENSE" ? match[1] : "CUSTOM",
          validate: (file: Wup.Name): true | string => {
            if (file === "LICENSE") {
              return `LICENSE will be overwritten by this generator.
Change your custom license file name.`;
            } else if (file.length > 254) {
              return `File name too long (max: 254)`;
            } else if (!file.match(/^[\w.-]+$/)) {
              return `Invalid file name: ${chalk.yellow(
                file
              )}, use only plain latin letters, numbers, '-', '_' or '.'`;
            }
            return true;
          },
        },
      ];

      const props = await this.prompt(prompts);
      const file = (props[name] as string).trim();

      res[idx] = `SEE IN FILE ${file}`;
    }

    return res;
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
          default: licenses.map(this._unsuffixGPL),
        },
      ];

      const props = await this.prompt(prompts);

      licenses = props[this.generatorName] as string[];
      licenses = await this._promptingIfSeeInFile(licenses);

      await this._promptingIfGPL(licenses);

      license = this._toLicense(licenses.map(this._suffixGPL.bind(this)));

      this.addProp(this.generatorName, license);
    }
  }
}
