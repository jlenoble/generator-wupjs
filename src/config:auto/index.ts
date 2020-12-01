import Base from "../common/base-generator";

export default class Auto extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:auto",
        dependsOn: ["config:generator:version", "config:date"],
      })
    );
  }

  public initializing(): void {
    // Do nothing, just avoid AssertionError [ERR_ASSERTION]:
    // This Generator is empty. Add at least one method for it to run.
  }
}
