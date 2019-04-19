import Base from "../common/base-generator";

export default class GithubUsername extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:repository",
        willWrite: ["write:package.json"]
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
          default: "git"
        }
      ];

      const answers = await this.prompt(prompts);
      const type = answers[name];

      switch (type) {
        case "git":
        default:
          this.emit("dependsOn", "config:github:repository");
      }

      this.addProp(name, type);
    }
  }

  public configuring(): void {
    const type = this.getProp(this.generatorName + ":type");

    switch (type) {
      case "git":
      default:
        this.addProp(this.generatorName, {
          type,
          url: this.getProp("config:github:repository")
        });
    }
  }
}
