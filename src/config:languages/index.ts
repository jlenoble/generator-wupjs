import Base from "../common/base-generator";

export default class Languages extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:languages",
        willWrite: ["write:package.json"]
      })
    );
  }

  public initializing(): void {
    this.addProp(
      "config:languages:typescript",
      this.config.get("typescript") || false
    );
    this.addProp("config:languages:jsx", this.config.get("jsx") || false);
    this.addProp(
      "config:languages:extensions",
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

      this.config.set(
        "typescript",
        this.getProp("config:languages:typescript")
      );

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

      if (this.getProp("config:languages:jsx")) {
        choices.add(".jsx");
        defaultChoice = ".jsx";
      }

      if (this.getProp("config:languages:typescript")) {
        choices.add(".ts");
        defaultChoice = ".ts";

        if (this.getProp("config:languages:jsx")) {
          choices.add(".tsx");
          defaultChoice = ".tsx";
        }
      }

      prompts = [
        {
          type: "checkbox",
          name: this.generatorName + ":extensions",
          choices: Array.from(choices),
          message: "Pick the extensions you'll use",
          default: this.getProp(this.generatorName + ":extensions") || [
            defaultChoice
          ]
        }
      ];

      this.addProp(await this.prompt(prompts));

      this.config.set(
        "typescript",
        this.getProp("config:languages:typescript")
      );
      this.config.set("jsx", this.getProp("config:languages:jsx"));
      this.config.set(
        "extensions",
        this.getProp("config:languages:extensions")
      );
    }
  }
}
