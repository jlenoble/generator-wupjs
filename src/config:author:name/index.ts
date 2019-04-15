import Base from "../common/base-generator";

type Name = Wup.Name;

export default class AuthorName extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:author:name",
        willWrite: ["write:package.json", "write:LICENSE"]
      })
    );
  }

  public initializing(): void {
    try {
      const author: Wup.Name | Wup.Person = this.fs.readJSON(
        this.destinationPath("package.json")
      ).author;

      if (typeof author === "string") {
        this.addProp(this.generatorName, author);
      } else {
        this.addProp(this.generatorName, author.name);
      }
    } catch (e) {}
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Author's name:",
          default: this.getProp(this.generatorName),
          validate: (name: Name): true | string => {
            if (
              name.match(
                /^[A-Za-zÀ-ÖØ-öø-ÿ]+([-'][A-Za-zÀ-ÖØ-öø-ÿ]+)*\.?( [A-Za-zÀ-ÖØ-öø-ÿ]+([-'][A-Za-zÀ-ÖØ-öø-ÿ]+)*\.?)*$/
              )
            ) {
              return true;
            }

            return `Name should be an actual name, for example:
John Doe, John-Paul Doe, John O'Doe, John P. Doe`;
          }
        }
      ];

      this.addProp(await this.prompt(prompts));
    }
  }
}
