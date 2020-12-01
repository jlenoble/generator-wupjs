import Base from "../common/base-generator";
import { getAuthorName } from "../initializing/get-author-name";

type Name = Wup.Name;

export default class AuthorName extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:author:name",
        willWrite: ["write:package.json", "write:LICENSE"],
      })
    );
  }

  public initializing(): void {
    this.addProp(this.generatorName, getAuthorName(this));
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
          },
        },
      ];

      this.addProp(await this.prompt(prompts));
    }
  }
}
