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
      props: ['addons'],
      generator: 'addons'
    }, opts);

    super(args, options);
  }

  prompting() {
    const prompts = [{
      type: 'checkbox',
      name: 'addons',
      message: 'Use vendor libraries:',
      choices: ['React', 'Enzyme', 'ANTLR4'],
      default: this.get('addons')
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
      if (this.has('Enzyme') && !this.has('React')) {
        const addons = this.get('addons');
        addons.push('React');
        this.set({ addons });
      }

      if (this.has('ANTLR4')) {
        this.composeWith('parser');
      }
    });
  }

  configuring() {
    const addons = this.get('addons');
    if (addons.length === 0) {
      return;
    }

    if (addons.includes('React')) {
      this.addDeps({
        'react': '*',
        'react-dom': '*'
      });
      this.addDevDeps({
        'babel-preset-react': '*',
        'babel-plugin-add-module-exports': '*',
        'gulp-babel': '*'
      });
    }

    if (addons.includes('Enzyme')) {
      this.addDevDeps({
        'enzyme': '*',
        'chai': '*',
        'chai-enzyme': '*',
        'react-test-renderer': '*'
      });
    }
  }
};
module.exports = exports['default'];