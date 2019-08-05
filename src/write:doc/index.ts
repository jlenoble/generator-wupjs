import path from "path";
import fs from "fs-extra";
import Base from "../common/base-generator";
import { Props } from "../config:doc";

export default class WriteDoc extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:doc",
        dependsOn: ["config:doc"]
      })
    );
  }

  public async writing(): Promise<void> {
    if (!this.mustWrite()) {
      return;
    }

    const props: Props = this.getProp("config:doc") as Props;
    const { docDir, examplesDir } = props;

    let found = true;

    try {
      await fs.stat(this.destinationPath(docDir));
    } catch (e) {
      found = false;
    }

    if (!found) {
      // Don't overwrite docs if already exist...
      this.fs.copyTpl(
        this.templatePath("index.ejs"),
        this.destinationPath(path.join(docDir, "index.md")),
        props
      );

      this.fs.copyTpl(
        this.templatePath("usage.ejs"),
        this.destinationPath(path.join(docDir, "usage.md")),
        props
      );

      this.fs.copyTpl(
        this.templatePath("usage.test.ejs"),
        this.destinationPath(path.join(examplesDir, "usage.test.js")),
        props
      );
    }

    // ...But always update license...
    this.fs.copyTpl(
      this.templatePath("license.ejs"),
      this.destinationPath(path.join(docDir, "license.md")),
      props
    );

    // ...And config
    this.fs.copyTpl(
      this.templatePath("markdown.ejs"),
      this.destinationPath("markdown.json"),
      props
    );
  }
}
