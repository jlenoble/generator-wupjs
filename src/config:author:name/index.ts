import Base from "../common/base-generator";

type Name = Wup.Name;

export default class AuthorName extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:author:name",
        willWrite: ["write:package.json"]
      })
    );
  }

  protected _isValid(props: Wup.Options): boolean {
    const name: Name = props[this.generatorName] as Name;

    if (name.match(/^\w+([-']\w+)*\.?( \w+([-']\w+)*\.?)*$/)) {
      return true;
    }

    console.warn(`Name should be an actual name, for example:
John Doe, John-Paul Doe, John O'Doe, John P. Doe`);

    return false;
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
    if (this._mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Author's name:",
          default: this.getProp(this.generatorName)
        }
      ];

      const props = await this.prompt(prompts);

      if (this._isValid(props)) {
        this.addProp(props);
        return;
      }

      return this.prompting();
    }
  }
}
