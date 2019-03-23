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
      generator: 'write-ignore'
    }, opts);

    super(args, options);

    this.promptIfMissing(['preprocessors']);
    this.composeWith('github');
  }

  writing() {
    const props = this.getProps();
    props.sassCache = this._sassCache();

    this.fs.copyTpl(this.templatePath('gitignore'), this.destinationPath('.gitignore'), props);
  }

  _sassCache() {
    return this.has('Compass') ? '.sass-cache' : '';
  }
};
module.exports = exports.default;