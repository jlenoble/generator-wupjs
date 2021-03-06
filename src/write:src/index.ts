import upperCamelCase from "uppercamelcase";
import fs from "fs-extra";
import path from "path";
import Base from "../common/base-generator";
import prettyWrite from "../common/pretty-write";

type Name = Wup.Name;
type Path = Wup.Path;

interface Props extends Wup.Props {
  srcDir: Path;
  testDir: Path;
  files: Path[];
  srcFiles: Path[];
  testFiles: Path[];
  relPath: Path;
  className: Name;
  extensions: Path[];
}

export default class Src extends Base {
  protected props?: Props;

  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:src",
        dependsOn: [
          "config:paths",
          "config:languages",
          "config:modules",
          "config:package:name",
          "config:package:main",
        ],
      })
    );
  }

  public beforeWriting(): void {
    const srcDir = this.getProp("config:paths:src") as Path;

    try {
      if (fs.readdirSync(srcDir)) {
        return;
      }
    } catch (e) {
      // empty
    }

    const testDir = this.getProp("config:paths:test") as Path;
    const extensions = this.getProp("config:languages:extensions") as string[];
    let extension: string = extensions[0];

    forloop: for (const ext of extensions) {
      switch (ext) {
        case "tsx":
          break forloop;

        case "jsx":
          if (extension === "js" || extension === "ts") {
            extension = ext;
          }
          break;

        case "ts":
          if (extension === "js") {
            extension = ext;
          }
          break;
      }
    }

    let main = this.getProp("config:package:main") as string;

    if (main) {
      const _main = main.match(/^([-\w.]+\/)?([-\w.]+)\.js$/);
      if (_main !== null) {
        main = _main[2];
      } else {
        main = "index";
      }
    }

    const files = [main];

    const srcFiles =
      extensions.length > 1
        ? extensions.map((ext): string => path.join(srcDir, `${main}.${ext}`))
        : [path.join(srcDir, `${main}.${extension}`)];

    const testFiles =
      extensions.length > 1
        ? extensions.map((ext): string =>
            path.join(testDir, `${main}.test.${ext}`)
          )
        : [path.join(testDir, `${main}.test.${extension}`)];

    const relPath = extensions.length > 1 ? "../.." : "..";

    const className = upperCamelCase(
      (this.getProp("config:package:name") as Name).replace(/^@[-.\w]+\//, "")
    );

    this.props = {
      srcDir,
      testDir,
      files,
      srcFiles,
      testFiles,
      relPath,
      className,
      extensions,
      extension,
    };
  }

  public async writing(): Promise<void> {
    if (!this.mustWrite()) {
      return;
    }

    const props = this.props as Props;

    if (!props) {
      return;
    }

    let found = true;

    try {
      await Promise.all([
        fs.stat(this.destinationPath(props.srcDir)),
        fs.stat(this.destinationPath(props.testDir)),
      ]);
    } catch (e) {
      found = false;
    }

    if (!found) {
      const files = props.files;
      const extensions = props.extensions;

      props.srcFiles.forEach((file, i): void => {
        prettyWrite(
          this,
          props,
          this.templatePath(path.join(extensions[i], "class.ejs")),
          this.destinationPath(file)
        );
      });

      props.testFiles.forEach((file, i): void => {
        prettyWrite(
          this,
          { ...props, file: files[i] },
          this.templatePath(path.join(extensions[i], "class.test.ejs")),
          this.destinationPath(file)
        );
      });
    }
  }
}
