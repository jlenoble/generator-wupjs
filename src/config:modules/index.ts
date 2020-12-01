import Base from "../common/base-generator";

export default class Modules extends Base {
  public static types: string[] = ["ES6", "CommonJS", "AMD", "UMD"];

  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:modules",
        dependsOn: ["config:targets"],
        willWrite: ["write:package.json", "write:src"],
      })
    );
  }

  public initializing(): void {
    const dev: string[] = this.config.get("devModuleTypes") || [];
    const prod: string[] = this.config.get("prodModuleTypes") || [];

    if (this.getProp("config:targets:server") && !dev.length) {
      dev.push("ES6");
      prod.push("CommonJS");
    }

    if (this.getProp("config:targets:client") && !prod.length) {
      dev.push("ES6");
      prod.push("AMD");
    }

    this.addProp(this.generatorName + ":dev", [...new Set(dev)]);
    this.addProp(this.generatorName + ":prod", [...new Set(prod)]);
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      const prompts: Wup.Options[] = [
        {
          type: "checkbox",
          name: this.generatorName + ":dev",
          message: "Select your module type(s) for development?",
          choices: Modules.types,
          default: this.getProp(this.generatorName + ":dev") as string[],
        },
        {
          type: "checkbox",
          name: this.generatorName + ":prod",
          message: "Select your module type(s) for production?",
          choices: Modules.types,
          default: this.getProp(this.generatorName + ":prod") as string[],
        },
      ];

      this.addProp(await this.prompt(prompts));

      this.config.set(
        "devModuleTypes",
        this.getProp(this.generatorName + ":dev")
      );
      this.config.set(
        "prodModuleTypes",
        this.getProp(this.generatorName + ":prod")
      );

      if (this.config.get("prodModuleTypes").includes("CommonJS")) {
        this.addDevDep("babel-plugin-add-module-exports");
      }
    }
  }
}
