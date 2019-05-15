import Base from "../common/base-generator";

type Options = Wup.Options;

export interface Props {
  parser?: string;
  parserOptions: {
    ecmaVersion: number;
    sourceType: string;
    ecmaFeatures: Options;
  };
  plugins: string[];
  extends: string[];
  rules: Options;
}

export default class Eslint extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:eslint",
        willWrite: ["write:eslintrc"]
      })
    );
  }

  public async configure(): Promise<void> {
    let parser: string | undefined;
    const ecmaVersion: number = new Date().getFullYear();
    const ecmaFeatures: Wup.Options = {};
    const esLintPlugins: string[] = [];
    const _extends: string[] = ["google"];
    const esLintRules: Wup.Options = {
      "require-jsdoc": ["off"],
      "prefer-arrow-callback": ["error"]
    };

    this.addDevDep("eslint-config-google");
    this.addDevDep("prettier");
    this.addDevDep("eslint-config-prettier");
    this.addDevDep("eslint-plugin-prettier");

    _extends.push("plugin:prettier/recommended");

    if (this.getProp("config:languages:typescript")) {
      parser = "@typescript-eslint/parser";

      this.addDevDep("@typescript-eslint/parser");
      this.addDevDep("@typescript-eslint/eslint-plugin");

      _extends.push(
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint"
      );
    }

    const props: Props = {
      parser,
      parserOptions: {
        ecmaVersion,
        sourceType: "module",
        ecmaFeatures
      },
      plugins: esLintPlugins,
      extends: _extends,
      rules: esLintRules
    };

    this.addProp(this.generatorName, props);
  }
}
