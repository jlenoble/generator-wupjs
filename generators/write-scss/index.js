'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _base2.default {
  constructor(args, opts) {
    const options = Object.assign({
      generator: 'write-scss'
    }, opts);

    super(args, options);

    this.promptIfMissing(['preprocessors']);
  }

  writing() {
    const props = this.getProps();

    this.fs.copyTpl(this.templatePath('style.ejs'), this.destinationPath(_path2.default.join(this.dirs('sassDir'), 'style.scss')), props);
  }
};
module.exports = exports.default;