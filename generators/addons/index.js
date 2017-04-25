'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
  _inherits(_class, _Base);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    var options = Object.assign({
      props: ['addons'],
      generator: 'addons'
    }, opts);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));
  }

  _createClass(_class, [{
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      var prompts = [{
        type: 'checkbox',
        name: 'addons',
        message: 'Use vendor libraries:',
        choices: ['React', 'Enzyme'],
        default: this.get('addons')
      }];

      return this.prompt(prompts).then(function (props) {
        _this2.set(props);
        if (_this2.has('Enzyme') && !_this2.has('React')) {
          var addons = _this2.get('addons');
          addons.push('React');
          _this2.set({ addons: addons });
        }
      });
    }
  }, {
    key: 'configuring',
    value: function configuring() {
      var addons = this.get('addons');
      if (addons.length === 0) {
        return;
      }

      if (addons.includes('React')) {
        this.addDeps({
          'react': '*',
          'react-dom': '*'
        });
        this.addDevDeps({
          'babel-preset-react': '*',
          'babel-plugin-add-module-exports': '*',
          'gulp-babel': '*'
        });
      }

      if (addons.includes('Enzyme')) {
        this.addDevDeps({
          'enzyme': '*',
          'chai': '*',
          'chai-enzyme': '*'
        });
      }
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];