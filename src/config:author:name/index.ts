import Base from "../generator";

export default class Name extends Base {
  protected readonly generatorName: string = "config:author:name";

  public async prompting(): Promise<void> {
    const prompts = [
      {
        type: "input",
        name: this.generatorName,
        message: "Author's name:",
        default: this.get(this.generatorName)
      }
    ];

    const props = await this.prompt(prompts);
    this.set(props);
  }
}
