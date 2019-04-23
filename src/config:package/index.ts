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
          "config:package:keywords",
          "config:package:bugs",
          "config:package:main",
          "config:package:files",
          "config:package:types",
          "config:license" // "config:package:private" depends on it
        ]
      })
    );
  }

  public configuring(): void {
    const license = this.getProp("config:license");

    if (license === "UNLICENSED") {
      this.addProp("config:package:private", true);
    }

    this.addProp(this.generatorName, {
      name: this.getProp("config:package:name"),
      version: this.getProp("config:package:version"),
      private: this.getProp("config:package:private"),
      description: this.getProp("config:package:description"),
      keywords: this.getProp("config:package:keywords"),
      main: this.getProp("config:package:main"),
      files: this.getProp("config:package:files"),
      types: this.getProp("config:package:types"),
      bugs: this.getProp("config:package:bugs")
    });
  }
}
