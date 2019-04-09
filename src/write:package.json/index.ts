import Base from "../common/base-generator";

export default class PackageJson extends Base {
  protected props?: Wup.PackageJson;

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:package.json",
        dependsOn: ["config:author:name"]
      })
    );
  }

  public configuring(): void {
    const author = {
      name: this.getProp("config:author:name"),
      email: this.getProp("config:author:email")
    };

    this.props = { author };
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
