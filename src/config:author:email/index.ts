import Base from "../common/base-generator";

export default class AuthorEmail extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:author:email",
        willWrite: ["write:package.json", "write:LICENSE"]
      })
    );
  }

  protected _isValid(email: Wup.Email): boolean {
    if (email.length > 254) {
      this.log("An email address mustn't be longer than 254 characters");
    } else if (
      !email.match(/^[\w\d._%+-]{1,64}@(?:[\w\d-]{1,63}\.){1,8}\w{2,63}$/)
    ) {
      this.log("Invalid email address");
    } else {
      return true;
    }

    return false;
  }

  public initializing(): void {
    try {
      const author: Wup.Name | Wup.Person = this.fs.readJSON(
        this.destinationPath("package.json")
      ).author;

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
          }
        }
      ];

      const props = await this.prompt(prompts);
      const email = props[this.generatorName].toLowerCase();

      if (this._isValid(email)) {
        this.addProp(this.generatorName, email);
        return;
      }

      return this.prompting();
    }
  }
}
