import Base from "../common/base-generator";

type Path = Wup.Path;

export default class Paths extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:paths",
        willWrite: ["write:package.json", "write:src", "write:gitignore"]
      })
    );
  }

  public initializing(): void {
    this.addProp("config:paths:src", this.config.get("srcDir") || "src");
    this.addProp("config:paths:test", this.config.get("testDir") || "test");
    this.addProp("config:paths:build", this.config.get("buildDir") || "build");
    this.addProp("config:paths:doc", this.config.get("docDir") || "doc");
    this.addProp("config:paths:lib", this.config.get("libDir") || "lib");
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const validate = (path: Path): boolean | string => {
        return /^(\/|~|[-$\+\.\w]+)(\/+[-$\+\.\w])*$/.test(path)
          ? true
          : `Invalid path ${path}`;
      };

      const prompts = [
        {
          type: "input",
          name: this.generatorName + ":src",
          message: "Source directory:",
          default: this.getProp(this.generatorName + ":src"),
          validate
        },
        {
          type: "input",
          name: this.generatorName + ":test",
          message: "Test directory:",
          default: this.getProp(this.generatorName + ":test"),
          validate
        },
        {
          type: "input",
          name: this.generatorName + ":build",
          message: "Build directory:",
          default: this.getProp(this.generatorName + ":build"),
          validate
        },
        {
          type: "input",
          name: this.generatorName + ":doc",
          message: "Documention directory:",
          default: this.getProp(this.generatorName + ":doc"),
          validate
        },
        {
          type: "input",
          name: this.generatorName + ":lib",
          message: "Lib directory:",
          default: this.getProp(this.generatorName + ":lib"),
          validate
        }
      ];

      this.addProp(await this.prompt(prompts));

      this.config.set("srcDir", this.getProp("config:paths:src"));
      this.config.set("testDir", this.getProp("config:paths:test"));
      this.config.set("buildDir", this.getProp("config:paths:build"));
      this.config.set("docDir", this.getProp("config:paths:doc"));
      this.config.set("libDir", this.getProp("config:paths:lib"));
    }
  }
}
