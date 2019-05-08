import path from "path";
import Base from "../common/base-generator";

export default class Parser extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:parser",
        dependsOn: ["config:languages", "config:paths"],
        willWrite: ["write:parser"]
      })
    );
  }

  public initializing(): void {
    this.addProp(
      this.generatorName + ":grammar",
      this.config.get("grammar") || "MyGrammar"
    );

    this.addProp(
      this.generatorName + ":rule",
      this.config.get("rule") || "prog"
    );

    this.addProp(
      this.generatorName + ":parsers",
      this.config.get("parsers") || ["Listener"]
    );

    this.addProp(
      this.generatorName + ":visitor",
      this.config.get("visitor") || "MyVisitor"
    );

    this.addProp(
      this.generatorName + ":listener",
      this.config.get("listener") || "MyListener"
    );
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt && this.getProp("config:languages:antlr4")) {
      let prompts = [
        {
          type: "input",
          name: this.generatorName + ":grammar",
          message: "Grammar name:",
          default: this.getProp(this.generatorName + ":grammar")
        },
        {
          type: "input",
          name: this.generatorName + ":rule",
          message: "Parser's starting rule:",
          default: this.getProp(this.generatorName + ":rule")
        },
        {
          type: "checkbox",
          name: this.generatorName + ":parsers",
          message: "Generated parser files:",
          choices: ["Listener", "Visitor"],
          default: this.getProp(this.generatorName + ":parsers")
        }
      ];

      this.setProp(await this.prompt(prompts));

      const parsers = this.getProp(this.generatorName + ":parsers") as string[];
      prompts = [];

      if (parsers.includes("Listener")) {
        prompts.push({
          type: "input",
          name: this.generatorName + ":listener",
          message: "Listener name:",
          default: this.getProp(this.generatorName + ":listener")
        });
      }

      if (parsers.includes("Visitor")) {
        prompts.push({
          type: "input",
          name: this.generatorName + ":visitor",
          message: "Visitor name:",
          default: this.getProp(this.generatorName + ":visitor")
        });
      }

      this.setProp(await this.prompt(prompts));

      this.addDep("antlr4");
      this.addDevDep("gulp-antlr4", false);
      this.addDevDep("plugin-error");
      this.addDevDep("through2");
      this.addDevDep("child-process-data", false);
    }
  }

  public configuring(): void {
    this.addProp(
      "config:paths:static",
      this.config.get("staticDir") ||
        path.join(this.getProp("config:paths:src") as string, "static")
    );

    this.addProp(
      "config:paths:data",
      this.config.get("dataDir") ||
        path.join(this.getProp("config:paths:static") as string, "data")
    );

    this.addProp(
      "config:paths:visitor",
      this.config.get("visitorDir") ||
        path.join(this.getProp("config:paths:static") as string, "antlr4")
    );

    this.addProp(
      "config:paths:listener",
      this.config.get("listenerDir") ||
        path.join(this.getProp("config:paths:static") as string, "antlr4")
    );

    this.addProp(
      "config:paths:parser",
      this.config.get("parserDir") ||
        path.join(this.getProp("config:paths:listener") as string, "parsers")
    );

    this.addProp(
      "config:paths:grammar",
      this.config.get("grammarDir") ||
        path.join(this.getProp("config:paths:listener") as string, "grammars")
    );
  }
}
