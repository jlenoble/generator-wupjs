import Base from "../common/base-generator";

export default class Name extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:author:name"
      })
    );
  }

  public async prompting(): Promise<void> {
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
