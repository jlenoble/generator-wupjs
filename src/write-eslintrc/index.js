import Base from '../base';
import stringify from 'json-stable-stringify';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-eslintrc',
    }, opts);

    super(args, options);

    this.promptIfMissing(['babel', 'linters', 'addons']);
  }

  writing () {
    const props = this.getProps();
    props.ecmaVersion = this._ecmaVersion();
    props.ecmaFeatures = this._ecmaFeatures();
    props.esLintPlugins = this._esLintPlugins();
    props.esLintRules = this._esLintRules();

    if (props.linters.includes('EsLint')) {
      this.fs.copyTpl(
        this.templatePath('eslintrc.ejs'),
        this.destinationPath('.eslintrc'),
        props
      );
    }
  }

  _ecmaFeatures () {
    return stringify(this.has('React') ? {jsx: true} : {}, {space: 2})
      .replace(/\n/g, '\n    ');
  }

  _ecmaVersion () {
    return this.get('babel').includes('env') ? 2018 : 5;
  }

  _esLintPlugins () {
    return stringify(this.has('React') ? ['react'] : []);
  }

  _esLintRules () {
    const rules = {
      'arrow-parens': ['error', 'as-needed'],
      'func-names': ['error', 'never'],
      'indent': ['error', 2],
      'max-len': ['error', {ignoreRegExpLiterals: true}],
      'no-param-reassign': ['error', {props: true}],
      'one-var': ['error', 'never'],
      'quotes': ['error', 'single', {allowTemplateLiterals: true}],
      'require-jsdoc': ['off'],
      'space-before-function-paren': ['error', 'always'],
    };

    if (this.has('React')) {
      Object.assign(rules, {
        'react/jsx-uses-react': ['error'],
        'react/jsx-uses-vars': ['error'],
      });
    }

    const keys = Object.keys(rules).sort();
    let str = '{';
    keys.forEach((key, i) => {
      str += '\n    "' + key + '": ' + stringify(rules[key])
        .replace(/,/g, ', ').replace(/:/g, ': ') + (i < keys.length - 1 ?
        ',' : '');
    });
    str += '\n  }';

    return str;
  }
}
