import Base from "../common/base-generator";

export default class PackageBugs extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:bugs",
        dependsOn: ["config:package:bugs:url", "config:package:bugs:email"],
      })
    );
  }

  // Misnomer, but allows this gen to be configured ahead of time
  // as "config:package:bugs:url" depends on "config:repository", messing up
  // Yeoman run loop order
  public prompting(): void {
    this.addProp(this.generatorName, {
      url: this.getProp("config:package:bugs:url"),
      email: this.getProp("config:package:bugs:email"),
    });
  }
}
