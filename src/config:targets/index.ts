import Base from "../common/base-generator";

export default class Targets extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:targets",
        dependsOn: ["config:languages"],
        willWrite: ["write:package.json"]
      })
    );
  }

  public initializing(): void {
    this.addProp("config:targets:server", this.config.get("server") || true);

    this.addProp(
      "config:targets:client",
      this.config.get("client") || this.config.get("jsx") || false
    );
  }

  public async prompting(): Promise<void> {
    let side = this.getProp(this.generatorName + ":server")
      ? this.getProp(this.generatorName + ":client")
        ? "both"
        : "server (Node)"
      : this.getProp(this.generatorName + ":client")
      ? "client (Browsers)"
      : undefined;

    if (this.mustPrompt) {
      const prompts: Wup.Options[] = [
        {
          type: "list",
          name: this.generatorName + ":side",
          message: "Which will you target?",
          choices: ["server (Node)", "client (Browsers)", "both"],
          // @ts-ignore
          default: side && [side]
        }
      ];

      side = (await this.prompt(prompts))[this.generatorName + ":side"];

      switch (side) {
        case "both":
          this.addProp(this.generatorName + ":server", true);
          this.addProp(this.generatorName + ":client", true);
          break;

        case "server (Browsers)":
          this.addProp(this.generatorName + ":server", false);
          this.addProp(this.generatorName + ":client", true);
          break;

        case "server (Node)":
        default:
          this.addProp(this.generatorName + ":server", true);
          this.addProp(this.generatorName + ":client", false);
          break;
      }

      this.config.set("server", this.getProp(this.generatorName + ":server"));
      this.config.set("client", this.getProp(this.generatorName + ":client"));
    }
  }
}
