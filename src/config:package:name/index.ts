import Base from "../common/base-generator";

export default class PackageName extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:name",
        willWrite: ["write:package.json", "write:src"]
      })
    );
  }

  public initializing(): void {
    this.addProp(this.generatorName, this.appname.replace(/\s+/g, "-"));
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Package name:",
          default: this.getProp(this.generatorName),
          validate: (name: Wup.GenName): true | string => {
            if (name.length > 214) {
              return `The name must be less than or equal to 214 characters.
        This includes the scope for scoped packages.`;
            } else if (name[0] === "." || name[0] === "_") {
              return "The name can’t start with a dot (.) or an underscore (_).";
            } else if (name.toLowerCase() !== name) {
              return "New packages must not have uppercase letters in the name.";
            } else if (/\s/.test(name)) {
              return `The name ends up being part of a URL, an argument on the command line, and a
        folder name. So don't use space characters`;
            } else if (encodeURIComponent(name) !== name) {
              // Scoped package names are valid
              if (name[0] !== "@" || name.split("/").length !== 2) {
                return `The name ends up being part of a URL, an argument on the command line, and a
        folder name. Therefore, the name can’t contain any non-URL-safe characters.`;
              }
            }
            return true;
          }
        }
      ];

      this.setProp(await this.prompt(prompts));
    }
  }
}
