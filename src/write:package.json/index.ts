import Base from "../common/base-generator";

export default class PackageJson extends Base {
  protected props?: Wup.PackageJson;

  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:package.json",
        dependsOn: [
          "config:package",
          "config:license",
          "config:author",
          "config:repository",
          "config:dependencies",
          "config:eslint", // add dev deps
        ],
      })
    );
  }

  // 'default' queue runs between 'configuring' and 'writing' queues
  public beforeWriting(): void {
    const _package = (this.getProp("config:package") as unknown) as Wup.Package;
    const license = (this.getProp("config:license") as unknown) as Wup.License;
    const author = (this.getProp("config:author") as unknown) as Wup.Person;
    const repository = (this.getProp(
      "config:repository"
    ) as unknown) as Wup.Repository;
    const engines = { node: ">=" + process.version.substring(1) };
    const dependencies = (this.getProp(
      "config:dependencies"
    ) as unknown) as Wup.Dependencies[];

    this.props = {
      ..._package,
      license,
      author,
      repository,
      engines,
      ...dependencies,
    };

    Object.keys(this.props).forEach((key): void => {
      if (!this.props) {
        return;
      }

      const a = this.props[key as keyof Wup.PackageJson];

      if (
        a === "" ||
        (Array.isArray(a) && a.length === 0) ||
        (typeof a === "object" && Object.keys(a).length === 0)
      ) {
        delete this.props[key as keyof Wup.PackageJson];
      }
    });
  }

  public writing(): void {
    if (!this.mustWrite()) {
      return;
    }

    if (this.props) {
      this.fs.writeJSON(
        this.destinationPath("package.json"),
        this.props,
        undefined,
        2
      );
    } else {
      this.log("Failed to write package.json: undefined props");
    }
  }
}
