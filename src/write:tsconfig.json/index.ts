import Base from "../common/base-generator";

type Path = Wup.Path;

interface Props {
  compilerOptions: {
    target: "esnext";
    module: "esnext";
    moduleResolution: "node";
    allowJs: true;
    noEmit: true;
    strict: true;
    isolatedModules: true;
    esModuleInterop: true;
    experimentalDecorators: true;
  };
  include: string[];
}

export default class TsConfigJson extends Base {
  protected props?: Props;

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:tsconfig.json",
        dependsOn: ["config:dev"]
      })
    );
  }

  public async configure(): Promise<void> {
    const srcDir = this.getProp("config:paths:src") as Path;
    const testDir = this.getProp("config:paths:test") as Path;

    this.props = {
      compilerOptions: {
        target: "esnext",
        module: "esnext",
        moduleResolution: "node",
        allowJs: true,
        noEmit: true,
        strict: true,
        isolatedModules: true,
        esModuleInterop: true,
        experimentalDecorators: true
      },
      include: [srcDir, testDir]
    };
  }

  public writing(): void {
    if (!this.mustWrite()) {
      return;
    }

    if (this.getProp("config:languages:typescript")) {
      if (this.props) {
        this.fs.writeJSON(
          this.destinationPath("tsconfig.json"),
          this.props,
          undefined,
          2
        );
      } else {
        this.log("Failed to write tsconfig.json: undefined props");
      }
    }
  }
}
