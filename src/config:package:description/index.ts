import Base from "../common/base-generator";

type Description = Wup.Description;

export default class PackageDescription extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:description",
        willWrite: ["write:package.json"],
      })
    );
  }

  public initializing(): void {
    try {
      const description: Description | undefined = ((this.fs.readJSON(
        this.destinationPath("package.json")
      ) as unknown) as Wup.PackageJson).description;

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
          default: this.getProp(this.generatorName),
          validate: (description: Description): true | string => {
            if (description.length > 3 && description.split(/\s+/).length > 1) {
              return true;
            }
            return "You must enter a proper description (at least a couple of words)";
          },
        },
      ];

      this.addProp(await this.prompt(prompts));
    }
  }
}
