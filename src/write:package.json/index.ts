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
          "config:author:name",
          "config:author:email"
        ]
      })
    );
  }

  public configuring(): void {
    const name = this.getProp("config:package:name");

    const author = {
      name: this.getProp("config:author:name"),
      email: this.getProp("config:author:email")
    };

    this.props = { name, author };
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
