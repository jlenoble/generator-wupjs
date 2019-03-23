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
      generator: 'write-demo'
    }, opts);

    super(args, options);

    this.promptIfMissing(['srcDir', 'preprocessors', 'addons', 'name']);
  }

  configuring() {
    if (!this.className) {
      this.className = this.compute('className');
    }
  }

  writing() {
    const props = this.getProps();
    props.Component = this.compute('className');
    props.module = this.compute('module');

    this.fs.copyTpl(this.templatePath('demo.ejs'), this.destinationPath(_path2.default.join(this.get('srcDir'), 'demo.js')), props);
  }
};
module.exports = exports.default;