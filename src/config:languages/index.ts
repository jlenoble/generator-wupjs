import Base from "../common/base-generator";

export default class Languages extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:languages",
        willWrite: [
          "write:package.json",
          "write:src",
          "write:eslintrc",
          "write:tsconfig.json"
        ]
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
      this.generatorName + ":jupyter",
      this.config.get("jupyter") || false
    );

    this.addProp(
      this.generatorName + ":antlr4",
      this.config.get("antlr4") || false
    );

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
          "js"
        ])
      );
      const previousChoices = new Set(this.getProp(
        this.generatorName + ":extensions"
      ) as string[]);
      let defaultChoice = "js";

      if (this.getProp(this.generatorName + ":jsx")) {
        choices.add("jsx");
        defaultChoice = "jsx";
      } else {
        choices.delete("jsx");
        choices.delete("tsx");
        previousChoices.delete("jsx");
        previousChoices.delete("tsx");
      }

      if (this.getProp(this.generatorName + ":typescript")) {
        choices.add("ts");
        defaultChoice = "ts";

        if (this.getProp(this.generatorName + ":jsx")) {
          choices.add("tsx");
          defaultChoice = "tsx";
        } else {
          choices.delete("tsx");
          previousChoices.delete("tsx");
        }
      } else {
        choices.delete("ts");
        previousChoices.delete("ts");
      }

      prompts = [
        {
          type: "checkbox",
          name: this.generatorName + ":extensions",
          choices: Array.from(new Set([defaultChoice, ...choices])),
          message: "Pick the extensions you'll use",
          default: Array.from(new Set([...previousChoices, defaultChoice]))
        }
      ];

      this.addProp(await this.prompt(prompts));

      this.config.set(
        "typescript",
        this.getProp(this.generatorName + ":typescript")
      );

      if (this.config.get("typescript")) {
        this.addDevDep("typescript");
        this.addDevDep("@babel/preset-typescript");
        this.addDevDep("@babel/plugin-proposal-class-properties");
        this.addDevDep("@babel/plugin-proposal-object-rest-spread");
        this.addDevDep("@babel/plugin-proposal-decorators");
      }

      this.config.set("jsx", this.getProp(this.generatorName + ":jsx"));

      this.config.set(
        "extensions",
        this.getProp(this.generatorName + ":extensions")
      );

      prompts = [
        {
          type: "confirm",
          name: this.generatorName + ":jupyter",
          message: "Will you use Jupyter notebooks?",
          default: this.getProp(this.generatorName + ":jupyter") as boolean
        }
      ];

      this.addProp(await this.prompt(prompts));

      this.config.set("jupyter", this.getProp(this.generatorName + ":jupyter"));

      prompts = [
        {
          type: "confirm",
          name: this.generatorName + ":antlr4",
          message: "Will you use ANTLR4 grammars?",
          default: this.getProp(this.generatorName + ":antlr4") as boolean
        }
      ];

      this.addProp(await this.prompt(prompts));

      this.config.set("antlr4", this.getProp(this.generatorName + ":antlr4"));
    }
  }
}
