import Base from "../common/base-generator";

export default class GithubRepository extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:github:repository",
        dependsOn: ["config:github:username", "config:package:name"]
      })
    );
  }

  public initializing(): void {
    try {
      const repository: Wup.Url | Wup.Repository = this.fs.readJSON(
        this.destinationPath("package.json")
      ).repository;

      const url = typeof repository === "string" ? repository : repository.url;

      this.addProp(this.generatorName, url);
    } catch (e) {}
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Github repository:",
          default: `git+https://github.com/${this.getProp(
            "config:github:username"
          )}/${this.getProp("config:package:name")}.git`
        }
      ];

      this.addProp(await this.prompt(prompts));
    }
  }
}
