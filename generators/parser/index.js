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
      props: ['grammar', 'parsers', 'listener', 'visitor', 'rule'],
      generator: 'parser'
    }, opts);

    super(args, options);

    this.composeWith('write-gulp-parse');
    this.addDeps({
      'antlr4': '*'
    });
    this.addDevDeps({
      'gulp-antlr4': '*',
      'gulp-util': '*',
      'through2': '*',
      'child-process-data': '*'
    });
  }

  prompting() {
    const prompts = [{
      type: 'input',
      name: 'grammar',
      message: 'Grammar name:',
      default: this.get('grammar')
    }, {
      type: 'input',
      name: 'rule',
      message: 'Parser\'s starting rule:',
      default: this.get('rule')
    }, {
      type: 'checkbox',
      name: 'parsers',
      message: 'Generated parser files:',
      choices: ['Listener', 'Visitor'],
      default: this.get('parsers') || ['Listener']
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);

      const parsers = this.get('parsers');
      const prompts = [];

      if (parsers.includes('Listener')) {
        prompts.push({
          type: 'input',
          name: 'listener',
          message: 'Listener name:',
          default: this.get('listener')
        });
      }

      if (parsers.includes('Visitor')) {
        prompts.push({
          type: 'input',
          name: 'visitor',
          message: 'Visitor name:',
          default: this.get('visitor')
        });
      }

      return this.prompt(prompts).then(props => {
        this.set(props);
      });
    });
  }
};
module.exports = exports['default'];