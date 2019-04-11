import Base from "../common/base-generator";

export default class PackageJson extends Base {
  protected props?: Wup.PackageJson;

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:package.json",
        dependsOn: [
          "config:package:name",
          "config:package:version",
          "config:package:description",
          "config:package:keywords",
          "config:license",
          "config:author"
        ]
      })
    );
  }

  public configuring(): void {
    const name = this.getProp("config:package:name") as Wup.GenName;
    const version = this.getProp("config:package:version") as Wup.Version;
    const description = this.getProp(
      "config:package:description"
    ) as Wup.Description;
    const keywords = this.getProp("config:package:keywords") as string[];

    const license = this.getProp("config:license") as Wup.License;

    const author = {
      name: this.getProp("config:author:name") as Wup.Name,
      email: this.getProp("config:author:email") as Wup.Email
    };

    this.props = { name, version, description, keywords, license, author };
  }

  public writing(): void {
    this.fs.writeJSON(
      this.destinationPath("package.json"),
      this.props as Wup.PackageJson,
      undefined,
      2
    );
  }
}
