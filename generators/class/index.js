'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
  _inherits(_class, _Base);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    var options = Object.assign({
      generator: 'class'
    }, opts);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));

    _this.promptIfMissing(['srcDir', 'testDir', 'name']);
    return _this;
  }

  _createClass(_class, [{
    key: 'initializing',
    value: function initializing() {
      this.argument('className', { type: String, required: false });
    }
  }, {
    key: 'configuring',
    value: function configuring() {
      if (!this.className) {
        this.className = this.compute('className');
      }
    }
  }, {
    key: 'writing',
    value: function writing() {
      var props = this.getProps();

      var filename = this.compute('classFileName');
      var testFilename = this.compute('classTestFileName');

      props.Class = this.className;
      props.module = this.compute('module');

      this.fs.copyTpl(this.templatePath('class.ejs'), this.destinationPath(_path2.default.join(props.srcDir, filename)), props);

      this.fs.copyTpl(this.templatePath('class.test.ejs'), this.destinationPath(_path2.default.join(props.testDir, testFilename)), props);
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];