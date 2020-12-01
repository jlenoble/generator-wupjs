import Base from "../common/base-generator";

type Bugs = Wup.Bugs;
type Url = Wup.Url;

export default class PackageBugsUrl extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:bugs:url",
        dependsOn: ["config:repository"],
        willWrite: ["write:package.json"],
      })
    );
  }

  public initializing(): void {
    try {
      const bugs: Bugs | undefined = ((this.fs.readJSON(
        this.destinationPath("package.json")
      ) as unknown) as Wup.PackageJson).bugs;
      const url: Url | undefined =
        typeof bugs === "string"
          ? bugs
          : typeof bugs === "object"
          ? bugs.url
          : "";

      if (
        url &&
        /^(https:\/\/)?(?:[\w-]{1,63}\.){1,8}[A-Za-z]{2,63}(\/[\w-.]+)*/.test(
          url
        )
      ) {
        this.addProp(this.generatorName, url);
      }
    } catch (e) {
      // empty
    }
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const bugs: Bugs = (this.getProp(this.generatorName) as unknown) as Bugs;
      let url: Url;

      if (!bugs || !bugs.url) {
        const type = this.getProp("config:repository:type") as string;

        switch (type) {
          case "git":
          default: {
            const username = this.getProp("config:github:username") as string;
            const genName = this.getProp("config:package:name") as string;
            url = `https://github.com/${username}/${genName}/issues`;
          }
        }
      } else {
        url = bugs.url;
      }

      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Url to report bugs to:",
          default: url,
        },
      ];

      this.addProp(await this.prompt(prompts));
    }
  }
}
