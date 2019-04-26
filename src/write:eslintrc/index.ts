import Base from "../common/base-generator";

interface Props {
  parser?: string;
  ecmaVersion: number;
  ecmaFeatures: string;
  esLintPlugins: string;
  _extends: string;
  esLintRules: string;
}

export default class EslintRc extends Base {
  protected props?: Props;

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:eslintrc",
        dependsOn: ["config:languages", "config:dependencies"]
      })
    );
  }

  public async configure(): Promise<void> {
    const devDependencies = this.getProp("config:dependencies:dev") as Set<
      string
    >;

    let parser: string | undefined;
    const ecmaVersion: number = new Date().getFullYear();
    const ecmaFeatures: Wup.Options = {};
    const esLintPlugins: string[] = [];
    const _extends: string[] = ["google"];
    const esLintRules: Wup.Options = {
      "require-jsdoc": ["off"],
      "prefer-arrow-callback": ["error"]
    };

    if (this.getProp("config:languages:typescript")) {
      parser = "@typescript-eslint/parser";
      _extends.push("plugin:@typescript-eslint/recommended");
    }

    _extends.push("plugin:prettier/recommended", "prettier/@typescript-eslint");

    this.props = {
      parser,
      ecmaVersion,
      ecmaFeatures: JSON.stringify(ecmaFeatures, undefined, 2),
      esLintPlugins: JSON.stringify(esLintPlugins, undefined, 2),
      _extends: JSON.stringify(_extends, undefined, 2),
      esLintRules: JSON.stringify(esLintRules, undefined, 2)
    };
  }

  public writing(): void {
    this.fs.copyTpl(
      this.templatePath("eslintrc.ejs"),
      this.destinationPath(".eslintrc"),
      this.props as Props
    );
  }
}
