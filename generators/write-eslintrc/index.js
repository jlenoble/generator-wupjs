'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _jsonStableStringify = require('json-stable-stringify');

var _jsonStableStringify2 = _interopRequireDefault(_jsonStableStringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
  _inherits(_class, _Base);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    var options = Object.assign({
      generator: 'write-eslintrc'
    }, opts);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));

    _this.promptIfMissing(['babel', 'linters', 'addons']);
    return _this;
  }

  _createClass(_class, [{
    key: 'writing',
    value: function writing() {
      var props = this.getProps();
      props.ecmaVersion = this._ecmaVersion();
      props.ecmaFeatures = this._ecmaFeatures();
      props.esLintPlugins = this._esLintPlugins();
      props.esLintRules = this._esLintRules();

      if (props.linters.includes('EsLint')) {
        this.fs.copyTpl(this.templatePath('eslintrc.ejs'), this.destinationPath('.eslintrc'), props);
      }
    }
  }, {
    key: '_ecmaFeatures',
    value: function _ecmaFeatures() {
      return (0, _jsonStableStringify2.default)(this.has('React') ? { jsx: true } : {}, { space: 2 }).replace(/\n/g, '\n    ');
    }
  }, {
    key: '_ecmaVersion',
    value: function _ecmaVersion() {
      var babel = this.get('babel');
      switch (babel) {
        case 'es2015':case 'es2016':case 'es2017':
          return babel.substring(2);

        default:
          return 5;
      }
    }
  }, {
    key: '_esLintPlugins',
    value: function _esLintPlugins() {
      return (0, _jsonStableStringify2.default)(this.has('React') ? ['react'] : []);
    }
  }, {
    key: '_esLintRules',
    value: function _esLintRules() {
      var rules = {
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

      var keys = Object.keys(rules).sort();
      var str = '{';
      keys.forEach(function (key, i) {
        str += '\n    "' + key + '": ' + (0, _jsonStableStringify2.default)(rules[key]).replace(/,/g, ', ').replace(/:/g, ': ') + (i < keys.length - 1 ? ',' : '');
      });
      str += '\n  }';

      return str;
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];