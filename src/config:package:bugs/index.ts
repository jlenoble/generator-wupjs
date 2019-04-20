import Base from "../common/base-generator";

export default class PackageBugs extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:bugs",
        dependsOn: ["config:package:bugs:url"] // Don't prompt for email by default
      })
    );
  }

  public configuring(): void {
    this.addProp(this.generatorName, {
      url: this.getProp("config:package:bugs:url"),
      email: this.getProp("config:package:bugs:email")
    });
  }
}
