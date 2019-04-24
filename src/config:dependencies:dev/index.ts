import Base from "../common/base-generator";

export default class DevDependencies extends Base {
  protected props: Set<string> = new Set();

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:dependencies:dev",
        dependsOn: ["config:modules"],
        willWrite: ["write:package.json"]
      })
    );
  }

  public initializing(): void {
    try {
      const devDependencies: Wup.Dependencies = this.fs.readJSON(
        this.destinationPath("package.json")
      ).devDependencies;

      Object.keys(devDependencies).forEach(
        (dep): void => {
          this.props.add(dep);
        }
      );

      this.addProp(this.generatorName, this.props);
    } catch (e) {
      this.addProp(this.generatorName, this.props);
    }
  }
}
