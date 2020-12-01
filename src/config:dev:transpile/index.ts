import Base from "../common/base-generator";

export default class DevTranspile extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:dev:transpile",
        dependsOn: ["config:dependencies"],
        willWrite: ["write:package.json", "write:babelrc"],
      })
    );
  }

  public configuring(): void {
    this.addDevDep("@babel/core");
    this.addDevDep("@babel/register");
    this.addDevDep("@babel/preset-env");

    if (this.getProp("config:dev:gulp")) {
      this.addDevDep("gulp-babel");
    }
  }
}
