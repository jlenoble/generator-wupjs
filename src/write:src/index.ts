import upperCamelCase from "uppercamelcase";
import path from "path";
import Base from "../common/base-generator";

type Name = Wup.Name;
type Path = Wup.Path;

interface Props {
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

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:src",
        dependsOn: [
          "config:paths",
          "config:languages",
          "config:modules",
          "config:package:name"
        ]
      })
    );
  }

  public beforeWriting(): void {
    const srcDir = this.getProp("config:paths:src") as Path;
    const testDir = this.getProp("config:paths:test") as Path;
    const extensions = this.getProp("config:languages:extensions") as string[];

    const files =
      extensions.length > 1
        ? extensions.map((ext): string => path.join(ext.substring(1), "index"))
        : ["index"];

    const srcFiles =
      extensions.length > 1
        ? extensions.map(
            (ext): string => path.join(srcDir, ext.substring(1), `index.${ext}`)
          )
        : [path.join(srcDir, `index.${extensions[0]}`)];

    const testFiles =
      extensions.length > 1
        ? extensions.map(
            (ext): string =>
              path.join(testDir, ext.substring(1), `index.${ext}`)
          )
        : [path.join(testDir, `index.test.${extensions[0]}`)];

    const relPath = extensions.length > 1 ? "../.." : "..";

    const className = upperCamelCase(this.getProp(
      "config:package:name"
    ) as Name);

    this.props = {
      srcDir,
      testDir,
      files,
      srcFiles,
      testFiles,
      relPath,
      className,
      extensions
    };
  }

  public writing(): void {
    const props = this.props as Props;
    const files = props.files;
    const extensions = props.extensions;

    props.srcFiles.forEach(
      (file, i): void => {
        this.fs.copyTpl(
          this.templatePath(path.join(extensions[i], "class.ejs")),
          this.destinationPath(file),
          props
        );
      }
    );

    props.testFiles.forEach(
      (file, i): void => {
        this.fs.copyTpl(
          this.templatePath(path.join(extensions[i], "class.test.ejs")),
          this.destinationPath(file),
          { ...props, file: files[i] }
        );
      }
    );
  }
}
