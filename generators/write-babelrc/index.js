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
      generator: 'write-babelrc'
    }, opts);

    super(args, options);

    this.promptIfMissing(['babel', 'addons']);
  }

  writing() {
    const props = this.getProps();

    if (this.has('Babel')) {
      props.presets = this._presets();
      props.plugins = this._plugins();

      this.fs.copyTpl(this.templatePath('babelrc.ejs'), this.destinationPath('.babelrc'), props);
    }
  }

  _plugins() {
    return Object.keys(this.get('devDeps')).filter(dep => {
      return dep.match(/babel-plugin/);
    }).map(dep => '"' + dep.replace('babel-plugin-', '') + '"').join(', ');
  }

  _presets() {
    const presets = [];

    switch (this.get('babel')) {
      case 'es2017':
        presets.push('es2017');
      // FALL THROUGH

      case 'es2016':
        presets.push('es2016');
      // FALL THROUGH

      case 'es2015':
        presets.push('es2015');
    }

    if (this.has('React')) {
      presets.push('react');
    }

    presets.sort();
    return presets.map(preset => `"${preset}"`).join(', ');
  }
};
module.exports = exports.default;