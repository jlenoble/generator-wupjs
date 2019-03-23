'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _base2.default {
  constructor(args, opts) {
    const options = Object.assign({
      props: ['gulpDir', 'srcDir', 'testDir', 'buildDir', 'libDir'],
      generator: 'paths'
    }, opts);

    super(args, options);
  }

  prompting() {
    const prompts = [{
      type: 'input',
      name: 'gulpDir',
      message: 'Gulp directory:',
      default: this.get('gulpDir')
    }, {
      type: 'input',
      name: 'srcDir',
      message: 'Source directory:',
      default: this.get('srcDir')
    }, {
      type: 'input',
      name: 'testDir',
      message: 'Test directory:',
      default: this.get('testDir')
    }, {
      type: 'input',
      name: 'buildDir',
      message: 'Build directory:',
      default: this.get('buildDir')
    }, {
      type: 'input',
      name: 'libDir',
      message: 'Lib directory:',
      default: this.get('libDir')
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }
};
module.exports = exports.default;