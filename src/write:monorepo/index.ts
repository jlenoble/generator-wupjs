import fs from "fs-extra";
import Base from "../common/base-generator";

type Path = Wup.Path;

export default class WritingMono extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:monorepo",
        dependsOn: ["config:gulp", "config:monorepo"]
      })
    );
  }

  public async writing(): void {
    if (!this.mustWrite() || !this.getProp("config:monorepo")) {
      return;
    }

    const packagesDir = this.getProp("config:paths:packages");

    try {
      await fs.stat(packagesDir);
    } catch (e) {
      await fs.mkdir(packagesDir);
    }
  }
}
