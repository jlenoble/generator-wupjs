import Base from "../common/base-generator";
import ConfigDependencies from "../config:dependencies";
import { EslintConfig } from "organon";

export default class Eslint extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:eslint",
        dependsOn: ["config:dependencies"],
        willWrite: ["write:eslintrc"],
      })
    );
  }

  public async configuring(): Promise<void> {
    const eslint = new EslintConfig({
      eslint: true,
      prettier: true,
      typescript: !!this.getProp("config:languages:typescript"),
    });

    this.addDevDep(eslint.dependencies);

    this.addProp(this.generatorName, (eslint as unknown) as Wup.PropValue);
  }

  public async afterConfiguring(): Promise<void> {
    // Dev deps added by this generator, so wait for all requests to complete
    // and update deps
    await (this.getGen(
      "config:dependencies"
    ) as ConfigDependencies).afterConfiguring();
  }
}
