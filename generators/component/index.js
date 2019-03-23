'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _base2.default {
  constructor(args, opts) {
    const options = Object.assign({
      generator: 'component'
    }, opts);

    super(args, options);

    this.promptIfMissing(['srcDir', 'testDir', 'name', 'addons']);
    this.composeWith('write-test-index');
  }

  initializing() {
    this.argument('componentName', { type: String, required: false });
  }

  configuring() {
    if (!this.className) {
      this.className = this.compute('className');
    }
  }

  writing() {
    const props = this.getProps();

    const filename = this.compute('fileStem') + '.jsx';
    const testFilename = this.compute('fileStem') + '.test.jsx';

    props.Component = this.compute('className');
    props.module = this.compute('module');
    props.testText = this._testText();
    props.importTestLib = this._importTestLib();

    this.fs.copyTpl(this.templatePath('component.ejs'), this.destinationPath(_path2.default.join(props.srcDir, filename)), props);

    this.fs.copyTpl(this.templatePath('component.test.ejs'), this.destinationPath(_path2.default.join(props.testDir, testFilename)), props);
  }

  _component() {
    return `<${this.compute('className')}/>`;
  }

  _importTestLib() {
    if (this.has('Enzyme')) {
      return `import {shallow} from 'enzyme';`;
    } else if (this.has('React')) {
      return `import TestUtils from 'react-dom/test-utils';`;
    } else {
      return '';
    }
  }

  _testText() {
    if (this.has('Enzyme')) {
      return `const wrapper = shallow(
      ${this._component()}
    );

    expect(wrapper.find('h1').text()).to.equal('Hello world!');`;
    } else if (this.has('React')) {
      return `const component = TestUtils.renderIntoDocument(${this._component()});
    const h1 = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');

    expect(h1.textContent).to.equal('Hello world!');`;
    } else {
      return '';
    }
  }
};
module.exports = exports.default;