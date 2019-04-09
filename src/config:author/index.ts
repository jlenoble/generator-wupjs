import Base from "../common/base-generator";

export default class Author extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:author",
        dependsOn: ["config:author:name", "config:author:email"]
      })
    );
  }

  public initializing(): void {
    // Do nothing, just avoid AssertionError [ERR_ASSERTION]:
    // This Generator is empty. Add at least one method for it to run.
  }
}
