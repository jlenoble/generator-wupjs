import Base from "../common/base-generator";

type Url = Wup.Url;

export default class PackageHomepage extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:homepage",
        dependsOn: ["config:repository"],
        willWrite: ["write:package.json"],
      })
    );
  }

  public initializing(): void {
    try {
      const url: Url | undefined = (this.fs.readJSON(
        this.destinationPath("package.json")
      ) as Wup.PackageJson).homepage;

      if (
        url &&
        /^(https:\/\/)?(?:[\w-]{1,63}\.){1,8}[A-Za-z]{2,63}(\/[\w-\.]+)*/.test(
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
      let url: Url = this.getProp(this.generatorName) as Url;

      if (!url) {
        const type = this.getProp("config:repository:type") as string;

        switch (type) {
          case "git":
          default: {
            const username = this.getProp("config:github:username") as string;
            const genName = this.getProp("config:package:name") as string;
            url = `https://github.com/${username}/${genName}#readme`;
          }
        }
      }

      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Homepage of the project:",
          default: url,
        },
      ];

      this.addProp(await this.prompt(prompts));
    }
  }
}
