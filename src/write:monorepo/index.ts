import fs from "fs-extra";
import Base from "../common/base-generator";

export default class WritingMono extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:monorepo",
        dependsOn: ["config:gulp", "config:monorepo"],
      })
    );
  }

  public async writing(): Promise<void> {
    if (!this.mustWrite() || !this.getProp("config:monorepo")) {
      return;
    }

    const packagesDir = this.getProp("config:paths:packages") as string;

    try {
      await fs.stat(packagesDir);
    } catch (e) {
      await fs.mkdir(packagesDir);
    }
  }
}
