import Base from "../common/base-generator";

export default class Repository extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:repository",
        dependsOn: ["config:github:repository"],
        willWrite: ["write:package.json"],
      })
    );
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const name = this.generatorName + ":type";

      const prompts = [
        {
          type: "list",
          name,
          message: "Repository type:",
          choices: ["git"],
          default: "git",
        },
      ];

      this.addProp(await this.prompt(prompts));
    }
  }

  public configuring(): void {
    const type = this.getProp(this.generatorName + ":type");

    switch (type) {
      case "git":
      default:
        this.addProp(this.generatorName, {
          type,
          url: this.getProp("config:github:repository"),
        });
    }
  }
}
