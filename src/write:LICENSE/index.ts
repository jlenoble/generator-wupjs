import Base from "../common/base-generator";
import LicenseGenerator from "../config:license";

export default class LICENSE extends Base {
  protected props?: Wup.LICENSE;

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:LICENSE",
        dependsOn: ["config:date", "config:author", "config:license"]
      })
    );
  }

  public _licenseSeparator(license: Wup.License): string {
    const label = "license";
    const n = Math.floor((license.length + label.length + 3) / 2);
    const separator = "━".repeat(40 - n);
    return `${separator} ${license} ${label} ${separator}

`;
  }

  // 'default' queue runs between 'configuring' and 'writing' queues
  public beforeWriting(): void {
    const license = this.getProp("config:license") as Wup.License;
    const { name, email } = this.getProp("config:author") as Wup.Person;
    const { createdOn, modifiedOn } = this.getProp(
      "config:date"
    ) as Wup.YoRcJson;

    const y1 = createdOn.getFullYear();
    const y2 = modifiedOn.getFullYear();

    const cYear = y1 === y2 ? y1.toString() : `${y1}-${y2}`;

    const gen = this.getGen("config:license") as LicenseGenerator;
    const licenses = gen._toLicenses(license);

    const licenseText =
      license !== "UNLICENSED"
        ? licenses
            .reduce((text, license): string => {
              if (license.includes("SEE IN FILE")) {
                return text;
              }
              
              const lic = gen._unsuffixGPL(license);

              const txt = this.fs.read(this.templatePath(`LICENSE_${lic}`));
              return `${text}${this._licenseSeparator(license)}${txt}
`;
            }, "")
            .trim()
        : "";

    this.props = {
      license,
      licenseText,
      cYear,
      cHolder: name,
      email: email as Wup.Email
    };
  }

  public writing(): void {
    if (this.props) {
      this.fs.copyTpl(
        this.templatePath("LICENSE"),
        this.destinationPath("LICENSE"),
        this.props
      );
    } else {
      this.log("Failed to write LICENSE: undefined props");
    }
  }
}
