import upperCamelCase from "uppercamelcase";
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
        ? extensions.map((ext): string => `${ext.substring(1)}/index`)
        : ["index"];

    const srcFiles =
      extensions.length > 1
        ? extensions.map(
            (ext): string => `${srcDir}/${ext.substring(1)}/index${ext}`
          )
        : [`${srcDir}/index${extensions[0]}`];

    const testFiles =
      extensions.length > 1
        ? extensions.map(
            (ext): string => `${testDir}/${ext.substring(1)}/index.test${ext}`
          )
        : [`${testDir}/index.test${extensions[0]}`];

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
      className
    };
  }

  public writing(): void {
    const props = this.props as Props;
    const files = props.files;

    props.srcFiles.forEach(
      (file): void => {
        this.fs.copyTpl(
          this.templatePath("class.ejs"),
          this.destinationPath(file),
          props
        );
      }
    );

    props.testFiles.forEach(
      (file, i): void => {
        this.fs.copyTpl(
          this.templatePath("class.test.ejs"),
          this.destinationPath(file),
          { ...props, file: files[i] }
        );
      }
    );
  }
}
