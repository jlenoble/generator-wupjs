import Base from "../common/base-generator";

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
      include: []
    };
  }

  public writing(): void {
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
