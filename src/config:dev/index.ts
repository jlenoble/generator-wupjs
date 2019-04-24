import Base from "../common/base-generator";

export default class Dev extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:dev",
        dependsOn: ["config:dependencies:dev", "config:dev:transpile"]
      })
    );
  }

  public initializing(): void {
    this.addProp(this.generatorName + ":gulp", true);
    this.config.set("gulp", true);
  }

  public configuring(): void {
    const devDependencies = this.getProp("config:dependencies:dev") as Set<
      string
    >;

    if (this.getProp(this.generatorName + ":gulp")) {
      devDependencies.add("gulp");
    }
  }
}
