import Base from "../common/base-generator";

export default class ProdDependencies extends Base {
  protected props: Map<string, string> = new Map();

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:dependencies:prod",
        dependsOn: ["config:modules"],
        willWrite: ["write:eslintrc", "write:package.json"]
      })
    );
  }

  public initializing(): void {
    try {
      const dependencies: Wup.Dependencies = this.fs.readJSON(
        this.destinationPath("package.json")
      ).dependencies;

      Object.keys(dependencies).forEach(
        (dep): void => {
          this.props.set(dep, dependencies[dep]);
        }
      );

      this.addProp(this.generatorName, this.props);
    } catch (e) {
      this.addProp(this.generatorName, this.props);
    }
  }
}
