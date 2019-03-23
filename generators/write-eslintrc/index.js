'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _jsonStableStringify = require('json-stable-stringify');

var _jsonStableStringify2 = _interopRequireDefault(_jsonStableStringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _base2.default {
  constructor(args, opts) {
    const options = Object.assign({
      generator: 'write-eslintrc'
    }, opts);

    super(args, options);

    this.promptIfMissing(['babel', 'linters', 'addons']);
  }

  writing() {
    const props = this.getProps();
    props.ecmaVersion = this._ecmaVersion();
    props.ecmaFeatures = this._ecmaFeatures();
    props.esLintPlugins = this._esLintPlugins();
    props.esLintRules = this._esLintRules();

    if (props.linters.includes('EsLint')) {
      this.fs.copyTpl(this.templatePath('eslintrc.ejs'), this.destinationPath('.eslintrc'), props);
    }
  }

  _ecmaFeatures() {
    return (0, _jsonStableStringify2.default)(this.has('React') ? { jsx: true } : {}, { space: 2 }).replace(/\n/g, '\n    ');
  }

  _ecmaVersion() {
    const babel = this.get('babel');
    switch (babel) {
      case 'es2015':case 'es2016':case 'es2017':
        return babel.substring(2);

      default:
        return 5;
    }
  }

  _esLintPlugins() {
    return (0, _jsonStableStringify2.default)(this.has('React') ? ['react'] : []);
  }

  _esLintRules() {
    const rules = {
      'arrow-parens': ['error', 'as-needed'],
      'func-names': ['error', 'never'],
      'indent': ['error', 2],
      'max-len': ['error', { ignoreRegExpLiterals: true }],
      'no-param-reassign': ['error', { props: true }],
      'one-var': ['error', 'never'],
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'require-jsdoc': ['off'],
      'space-before-function-paren': ['error', 'always']
    };

    if (this.has('React')) {
      Object.assign(rules, {
        'react/jsx-uses-react': ['error'],
        'react/jsx-uses-vars': ['error']
      });
    }

    const keys = Object.keys(rules).sort();
    let str = '{';
    keys.forEach((key, i) => {
      str += '\n    "' + key + '": ' + (0, _jsonStableStringify2.default)(rules[key]).replace(/,/g, ', ').replace(/:/g, ': ') + (i < keys.length - 1 ? ',' : '');
    });
    str += '\n  }';

    return str;
  }
};
module.exports = exports.default;