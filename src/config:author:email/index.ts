import Base from "../common/base-generator";

export default class Email extends Base {
  protected readonly generatorName: string = "config:author:email";

  public async prompting(): Promise<void> {
    const prompts = [
      {
        type: "input",
        name: this.generatorName,
        message: "Author's email address:",
        default: this.get(this.generatorName)
      }
    ];

    const props = await this.prompt(prompts);
    this.set(props);
  }
}
