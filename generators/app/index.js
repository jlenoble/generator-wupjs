'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
  _inherits(_class, _Base);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    var options = Object.assign({
      generator: 'app'
    }, opts);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));

    _this.composeWith('module');
    _this.composeWith('who');
    _this.composeWith('github');
    _this.composeWith('license');
    _this.composeWith('babel');
    _this.composeWith('lint');
    _this.composeWith('addons');
    _this.composeWith('preprocessors');
    _this.composeWith('test');
    _this.composeWith('write-gulpfile');
    _this.composeWith('write-gulp-build');
    _this.composeWith('write-gulp-clean');
    _this.composeWith('write-gulp-distclean');
    _this.composeWith('write-gulp-dist');
    _this.composeWith('write-gulp-doc');
    _this.composeWith('write-gulp-prepublish');
    _this.composeWith('write-gulp-tdd');
    _this.composeWith('write-gulp-watch');
    _this.composeWith('write-src');
    return _this;
  }

  _createClass(_class, [{
    key: 'initializing',
    value: function initializing() {
      this.log((0, _yosay2.default)('Welcome to our ' + _chalk2.default.red('generator-wupjs') + ' generator!'));
    }
  }, {
    key: 'configuring',
    value: function configuring() {
      if (this.has('React')) {
        this.composeWith('write-gulp-serve');
        this.composeWith('write-gulp-bundle');
        this.composeWith('write-gulp-test-bundle');
        this.composeWith('write-src-html');
        this.composeWith('write-test-html');
        this.composeWith('write-test-index');
        this.composeWith('write-demo');
      }
    }
  }, {
    key: 'install',
    value: function install() {
      this.installDependencies();
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];