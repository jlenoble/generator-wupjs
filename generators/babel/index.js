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
      props: ['babel'],
      generator: 'babel'
    }, opts);

    super(args, options);
  }

  prompting() {
    const prompts = [{
      type: 'checkbox',
      name: 'babel',
      message: 'Ecmascript presets (Babel):',
      choices: ['env'],
      default: this.get('babel')
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }

  configuring() {
    const babel = this.get('babel');
    const deps = {};

    if (babel.includes('env')) {
      Object.assign(deps, {
        'babel-core': '*',
        'babel-preset-env': '*',
        'babel-plugin-add-module-exports': '*',
        'gulp-babel': '*'
      });
      this.composeWith('write-gulpfile');
      this.addDevDeps(deps);
    }
  }
};
module.exports = exports.default;