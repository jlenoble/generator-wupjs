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
      props: ['testRunners'],
      generator: 'test'
    }, opts);

    super(args, options);
  }

  prompting() {
    const prompts = [{
      type: 'checkbox',
      name: 'testRunners',
      message: 'Test runners:',
      choices: ['Mocha'],
      default: this.get('testRunners')
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }

  configuring() {
    const testRunners = this.get('testRunners');
    if (testRunners.length === 0) {
      return;
    }

    if (testRunners.includes('Mocha')) {
      this.addDevDeps({
        'gulp-mocha': '*',
        'chai': '*'
      });
    }

    this.composeWith('write-gulp-test');
  }
};
module.exports = exports['default'];