import Base from "../common/base-generator";

export default class Name extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:name",
        willWrite: ["write:package.json"]
      })
    );
  }

  public initializing(): void {
    this.addProp(this.generatorName, this.appname.replace(/\s+/g, "-"));
  }

  public async prompting(): Promise<void> {
    if (this._mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Package name:",
          default: this.getProp(this.generatorName)
        }
      ];

      const props = await this.prompt(prompts);
      const name = props[this.generatorName];

      if (name.length > 214) {
        console.warn(`The name must be less than or equal to 214 characters.
This includes the scope for scoped packages.`);
      } else if (name[0] === "." || name[0] === "_") {
        console.warn("The name can’t start with a dot or an underscore.");
      } else if (name.toLowerCase() !== name) {
        console.warn(
          "New packages must not have uppercase letters in the name."
        );
      } else if (/\s/.test(name)) {
        console.warn(`The name ends up being part of a URL, an argument on the command line, and a
folder name. So don't use space characters`);
      } else if (encodeURIComponent(name) !== name) {
        console.warn(`The name ends up being part of a URL, an argument on the command line, and a
folder name. Therefore, the name can’t contain any non-URL-safe characters.`);
      } else {
        this.setProp(props);
        return;
      }

      return this.prompting();
    }
  }
}
