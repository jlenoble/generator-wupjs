import Base from "../common/base-generator";
import chalk from "chalk";
import yosay from "yosay";

export default class App extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "app",
        dependsOn: [
          "config:dev",
          "config:package",
          "config:eslint",
          "config:author",
          "config:license",
          "config:repository",
          "config:languages",
          "config:targets",
          "config:modules",
          "config:paths",
          "config:parser",
          "config:gulp",
          "config:monorepo"
        ]
      })
    );
  }

  public initializing(): void {
    this.log(yosay("Welcome to our " + chalk.yellow("Wup") + " generator!"));
  }

  public install(): void {
    this.installDependencies({ bower: false });
  }
}
