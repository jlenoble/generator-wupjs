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
      props: ['name', 'description'],
      generator: 'module'
    }, opts);

    super(args, options);
  }

  prompting() {
    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Package name:',
      default: this.get('name') || this.compute('name')
    }, {
      type: 'input',
      name: 'description',
      message: 'Package description:',
      default: this.get('description')
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }
};
module.exports = exports['default'];