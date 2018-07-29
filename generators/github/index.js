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
      props: ['github'],
      generator: 'github'
    }, opts);

    super(args, options);

    this.composeWith('write-gitignore');
  }

  prompting() {
    const prompts = [{
      type: 'input',
      name: 'github',
      message: 'GitHub user name:',
      default: this.get('github')
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }
};
module.exports = exports['default'];