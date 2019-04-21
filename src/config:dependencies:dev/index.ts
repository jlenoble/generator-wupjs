import Base from "../common/base-generator";

export default class DevDependencies extends Base {
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

  public initializing(): void {}
}
