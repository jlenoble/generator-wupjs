import Base from "../common/base-generator";

export default class Dependencies extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:dependencies",
        dependsOn: ["config:dependencies:dev"]
      })
    );
  }

  public configuring(): void {
    this.addProp(this.generatorName, {
      dependencies: this.getProp("config:dependencies:prod"),
      devDependencies: this.getProp("config:dependencies:dev"),
      peerDependencies: this.getProp("config:dependencies:peer"),
      optionalDependencies: this.getProp("config:dependencies:optional")
    });
  }
}
