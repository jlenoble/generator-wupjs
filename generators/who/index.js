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
      props: ['author', 'email'],
      generator: 'who'
    }, opts);

    super(args, options);
  }

  prompting() {
    const prompts = [{
      type: 'input',
      name: 'author',
      message: 'Author\'s name:',
      default: this.get('author')
    }, {
      type: 'input',
      name: 'email',
      message: 'Email address:',
      default: this.get('email')
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }
};
module.exports = exports['default'];