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

  public async writing(): void {
    if (!this.mustWrite()) {
      return;
    }

    const props: Props = this.getProp("config:doc") as Props;

    let found = true;

    try {
      await fs.stat(this.destinationPath(props.docDir));
    } catch (e) {
      found = false;
    }

    if (!found) {
      // Don't overwrite doc index if already exists
      this.fs.copyTpl(
        this.templatePath("index.ejs"),
        this.destinationPath(path.join(props.docDir, "index.md")),
        props
      );
    }

    this.fs.copyTpl(
      this.templatePath("license.ejs"),
      this.destinationPath(
        path.join(this.getProp("config:paths:doc"), "license.md")
      ),
      props
    );

    this.fs.copyTpl(
      this.templatePath("markdown.ejs"),
      this.destinationPath("markdown.json"),
      props
    );
  }
}
