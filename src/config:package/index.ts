import Base from "../common/base-generator";

export default class Package extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package",
        dependsOn: [
          "config:package:name",
          "config:package:version",
          "config:package:description",
          "config:package:keywords"
        ],
        willWrite: ["write:package.json"]
      })
    );
  }

  public initializing(): void {
    // Do nothing, just avoid AssertionError [ERR_ASSERTION]:
    // This Generator is empty. Add at least one method for it to run.
  }
}
