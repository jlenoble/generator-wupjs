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
      props: ['license'],
      generator: 'license'
    }, opts);

    super(args, options);
  }

  prompting() {
    const prompts = [{
      type: 'list',
      name: 'license',
      message: 'LICENSE:',
      choices: ['MIT', 'GPL-3.0'],
      default: this.get('license')
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }
};
module.exports = exports['default'];