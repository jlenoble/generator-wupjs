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
      props: ['linters'],
      generator: 'lint'
    }, opts);

    super(args, options);
  }

  prompting() {
    const prompts = [{
      type: 'checkbox',
      name: 'linters',
      message: 'Linters:',
      choices: ['EsLint'],
      default: this.get('linters')
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }

  configuring() {
    const linters = this.get('linters');
    if (linters.length === 0) {
      return;
    }

    if (linters.includes('EsLint')) {
      this.addDevDeps({
        'gulp-eslint': '*',
        'eslint-config-google': '*'
      });

      if (this.has('React')) {
        this.addDevDeps({ 'eslint-plugin-react': '*' });
      }
    }

    this.composeWith('write-gulp-lint');
  }
};
module.exports = exports.default;