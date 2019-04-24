import Base from "../common/base-generator";

export default class DevTranspile extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:dev:transpile",
        dependsOn: ["config:dependencies:dev"],
        willWrite: ["write:package.json"]
      })
    );
  }

  public configuring(): void {
    const devDependencies = this.getProp("config:dependencies:dev") as Set<
      string
    >;

    devDependencies.add("@babel/core");
    devDependencies.add("@babel/register");

    if (this.getProp("config:dev:gulp")) {
      devDependencies.add("gulp-babel");
    }
  }
}
