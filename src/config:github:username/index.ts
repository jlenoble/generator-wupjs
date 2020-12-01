import Base from "../common/base-generator";

export default class GithubUsername extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:github:username",
        willWrite: ["write:package.json"],
      })
    );
  }

  public initializing(): void {
    try {
      const repository:
        | Wup.Url
        | Wup.Repository
        | undefined = (this.fs.readJSON(
        this.destinationPath("package.json")
      ) as Wup.PackageJson).repository;

      const url = typeof repository === "string" ? repository : repository.url;
      const match =
        url.match(
          /^(?:(?:git|https|git\+https):\/\/)?github\.com\/([-\w]+)\/.+\.git$/i
        ) || [];

      this.addProp(this.generatorName, match[1]);
    } catch (e) {}
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Github user name:",
          default: this.getProp(this.generatorName),
        },
      ];

      this.addProp(await this.prompt(prompts));
    }
  }
}
