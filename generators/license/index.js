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
      props: ['license'],
      generator: 'license'
    }, opts);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));

    _this.composeWith('date');
    _this.composeWith('gen-version');

    _this.promptIfMissing(['author', 'email']);
    return _this;
  }

  _createClass(_class, [{
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      var prompts = [{
        type: 'list',
        name: 'license',
        message: 'LICENSE:',
        choices: ['MIT', 'GPL-3.0'],
        default: this.get('license')
      }];

      return this.prompt(prompts).then(function (props) {
        _this2.set(props);
      });
    }
  }, {
    key: 'writing',
    value: function writing() {
      var props = {};
      var created = this.get('created').getFullYear();
      var updated = this.get('updated').getFullYear();

      props.author = this.get('author');
      props.email = this.get('email');
      props.license = this.get('license');

      if (created < updated) {
        props.cYear = created + '-';
      } else {
        props.cYear = '';
      }
      props.cYear += updated;

      this.fs.copyTpl(this.templatePath('LICENSE_' + props.license), this.destinationPath('LICENSE'), props);
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];