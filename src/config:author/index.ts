import Base from "../common/base-generator";

export default class Author extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:author",
        dependsOn: ["config:author:name", "config:author:email"],
      })
    );
  }

  public configuring(): void {
    this.addProp(this.generatorName, {
      name: this.getProp("config:author:name"),
      email: this.getProp("config:author:email"),
    });
  }
}
