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

  public configuring(): void {
    this.addProp(this.generatorName, {
      name: this.getProp("config:package:name"),
      version: this.getProp("config:package:version"),
      description: this.getProp("config:package:description"),
      keywords: this.getProp("config:package:keywords")
    });
  }
}
