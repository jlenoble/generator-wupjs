import Base from "../common/base-generator";

export default class Name extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:author:name",
        willWrite: ["write:package.json"]
      })
    );
  }

  public initializing(): void {
    try {
      const author: Wup.Name | Wup.Person = this.fs.readJSON(
        this.destinationPath("package.json")
      ).author;

      if (typeof author === "string") {
        this.addProp(this.generatorName, author);
      } else {
        this.addProp(this.generatorName, author.name);
      }
    } catch (e) {}
  }

  public async prompting(): Promise<void> {
    if (this._mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Author's name:",
          default: this.getProp(this.generatorName)
        }
      ];

      const props = await this.prompt(prompts);
      this.setProp(props);
    }
  }
}
