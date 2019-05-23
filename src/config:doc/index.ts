import Base from "../common/base-generator";

export interface Props {
  name: string;
  license: string;
  author: string;
  email: string;
  cYear: string;
  docDir: string;
}

export default class Doc extends Base {
  protected props?: Props;

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:doc",
        dependsOn: [
          "config:author",
          "config:date",
          "config:paths",
          "config:package",
          "config:license"
        ],
        willWrite: ["write:doc", "write:gulp"]
      })
    );
  }

  public initializing(): void {
    this.addProp(this.generatorName + ":config", "markdown.json");
  }

  public configuring(): void {
    const { createdOn, modifiedOn } = this.getProp(
      "config:date"
    ) as Wup.YoRcJson;

    const y1 = createdOn.getFullYear();
    const y2 = modifiedOn.getFullYear();

    const cYear = y1 === y2 ? y1.toString() : `${y1}-${y2}`;

    this.props = {
      name: this.getProp("config:package:name") as string,
      description: this.getProp("config:package:description") as string,
      license: this.getProp("config:license") as string,
      author: this.getProp("config:author:name") as string,
      email: this.getProp("config:author:email") as string,
      cYear,
      docDir: this.getProp("config:paths:doc") as string
    };

    this.addProp(this.generatorName, this.props);
  }
}