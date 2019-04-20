import Base from "../common/base-generator";

type Bugs = Wup.Bugs;
type Email = Wup.Email;

export default class PackageBugsEmail extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:bugs:email",
        dependsOn: ["config:author:email"]
      })
    );
  }

  public initializing(): void {
    try {
      const bugs: Bugs = this.fs.readJSON(this.destinationPath("package.json"))
        .bugs;
      const email: Email | undefined =
        typeof bugs === "string"
          ? bugs
          : typeof bugs === "object"
          ? bugs.email
          : "";

      if (
        email &&
        email.match(/^[\w.%+-]{1,64}@(?:[\w-]{1,63}\.){1,8}[A-Za-z]{2,63}$/)
      ) {
        this.addProp(this.generatorName, email);
      }
    } catch (e) {}
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Email to report bugs to:",
          default: this.getProp("config:author:email")
        }
      ];

      this.addProp(await this.prompt(prompts));
    }
  }
}
