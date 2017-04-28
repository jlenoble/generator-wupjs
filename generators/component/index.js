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
      generator: 'component'
    }, opts);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));

    _this.promptIfMissing(['srcDir', 'testDir', 'name', 'addons']);
    _this.composeWith('write-test-index');
    return _this;
  }

  _createClass(_class, [{
    key: 'initializing',
    value: function initializing() {
      this.argument('componentName', { type: String, required: false });
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

      var filename = this.compute('fileStem') + '.jsx';
      var testFilename = this.compute('fileStem') + '.test.jsx';

      props.Component = this.compute('className');
      props.module = this.compute('module');
      props.testText = this._testText();
      props.importTestLib = this._importTestLib();

      this.fs.copyTpl(this.templatePath('component.ejs'), this.destinationPath(_path2.default.join(props.srcDir, filename)), props);

      this.fs.copyTpl(this.templatePath('component.test.ejs'), this.destinationPath(_path2.default.join(props.testDir, testFilename)), props);
    }
  }, {
    key: '_component',
    value: function _component() {
      return '<' + this.compute('className') + '/>';
    }
  }, {
    key: '_importTestLib',
    value: function _importTestLib() {
      if (this.has('Enzyme')) {
        return 'import {shallow} from \'enzyme\';';
      } else if (this.has('React')) {
        return 'import TestUtils from \'react-dom/test-utils\';';
      } else {
        return '';
      }
    }
  }, {
    key: '_testText',
    value: function _testText() {
      if (this.has('Enzyme')) {
        return 'const wrapper = shallow(\n      ' + this._component() + '\n    );\n\n    expect(wrapper.find(\'h1\').text()).to.equal(\'Hello world!\');';
      } else if (this.has('React')) {
        return 'const component = TestUtils.renderIntoDocument(' + this._component() + ');\n    const h1 = TestUtils.findRenderedDOMComponentWithTag(component, \'h1\');\n\n    expect(h1.textContent).to.equal(\'Hello world!\');';
      } else {
        return '';
      }
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];