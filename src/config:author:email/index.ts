import Base from "../common/base-generator";

export default class AuthorEmail extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:author:email",
        willWrite: ["write:package.json", "write:LICENSE"],
      })
    );
  }

  public initializing(): void {
    try {
      const author: Wup.Name | Wup.Person = (this.fs.readJSON(
        this.destinationPath("package.json")
      ) as Wup.PackageJson).author;

      if (typeof author !== "string") {
        this.addProp(this.generatorName, author.email);
      }
    } catch (e) {}
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Author's email address:",
          default: this.getProp(this.generatorName),
          validate: (email: Wup.Email): true | string => {
            if (email.length > 254) {
              return "An email address mustn't be longer than 254 characters";
            } else if (
              !email.match(
                /^[\w.%+-]{1,64}@(?:[\w-]{1,63}\.){1,8}[A-Za-z]{2,63}$/
              )
            ) {
              return `Invalid email address: ${email}`;
            }

            return true;
          },
        },
      ];

      this.addProp(await this.prompt(prompts));
    }
  }
}
