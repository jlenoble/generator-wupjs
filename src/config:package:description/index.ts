import Base from "../common/base-generator";

type Description = Wup.Description;

export default class PackageDescription extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:description",
        willWrite: ["write:package.json"]
      })
    );
  }

  protected _isValid(props: Wup.Options): boolean {
    const description: Description = props[this.generatorName] as Description;

    if (description.length > 1) {
      return true;
    }

    this.log("You must enter a proper description, not an empty string");

    return false;
  }

  public initializing(): void {
    try {
      const description: Description = this.fs.readJSON(
        this.destinationPath("package.json")
      ).description;

      this.addProp(this.generatorName, description);
    } catch (e) {
      this.addProp(this.generatorName, "");
    }
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Package description:",
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
