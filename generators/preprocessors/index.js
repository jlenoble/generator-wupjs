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
      props: ['preprocessors'],
      generator: 'preprocessors'
    }, opts);

    super(args, options);
  }

  prompting() {
    const prompts = [{
      type: 'checkbox',
      name: 'preprocessors',
      message: 'Use preprocessors:',
      choices: ['Compass'],
      default: this.get('preprocessors')
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
      if (this.has('Compass')) {
        this.composeWith('write-gulp-sass');
        this.composeWith('write-scss');
        this.addDevDeps({
          'mocha': '*',
          'gulp-mocha-phantomjs': '*'
        });
      }
    });
  }

  configuring() {
    const addons = this.get('preprocessors');
    if (addons.length === 0) {
      return;
    }

    if (addons.includes('Compass')) {
      this.addDevDeps({
        'gulp-compass': '*'
      });
    }
  }
};
module.exports = exports.default;