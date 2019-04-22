import Base from "../common/base-generator";

export default class Languages extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:languages",
        willWrite: ["write:package.json", "write:src"]
      })
    );
  }

  public initializing(): void {
    this.addProp(
      this.generatorName + ":typescript",
      this.config.get("typescript") || false
    );

    this.addProp(this.generatorName + ":jsx", this.config.get("jsx") || false);

    this.addProp(
      this.generatorName + ":extensions",
      this.config.get("extensions") || []
    );
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      let prompts: Wup.Options[] = [
        {
          type: "confirm",
          name: this.generatorName + ":typescript",
          message: "Will you use TypeScript?",
          default: this.getProp(this.generatorName + ":typescript") as boolean
        }
      ];

      this.addProp(await this.prompt(prompts));

      prompts = [
        {
          type: "confirm",
          name: this.generatorName + ":jsx",
          message: "Will you use JavaScript XML (JSX)?",
          default: this.getProp(this.generatorName + ":jsx") as boolean
        }
      ];

      this.addProp(await this.prompt(prompts));

      const choices: Set<string> = new Set(
        (this.getProp(this.generatorName + ":extensions") as string[]).concat([
          ".js"
        ])
      );
      let defaultChoice = ".js";

      if (this.getProp(this.generatorName + ":jsx")) {
        choices.add(".jsx");
        defaultChoice = ".jsx";
      } else {
        choices.delete(".jsx");
        choices.delete(".tsx");
      }

      if (this.getProp(this.generatorName + ":typescript")) {
        choices.add(".ts");
        defaultChoice = ".ts";

        if (this.getProp(this.generatorName + ":jsx")) {
          choices.add(".tsx");
          defaultChoice = ".tsx";
        }
      } else {
        choices.delete(".ts");
      }

      prompts = [
        {
          type: "checkbox",
          name: this.generatorName + ":extensions",
          choices: Array.from(new Set([defaultChoice, ...choices])),
          message: "Pick the extensions you'll use",
          default: [defaultChoice]
        }
      ];

      this.addProp(await this.prompt(prompts));

      this.config.set(
        "typescript",
        this.getProp(this.generatorName + ":typescript")
      );

      this.config.set("jsx", this.getProp(this.generatorName + ":jsx"));

      this.config.set(
        "extensions",
        this.getProp(this.generatorName + ":extensions")
      );
    }
  }
}
