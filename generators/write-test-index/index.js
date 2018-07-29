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
      generator: 'write-test-index'
    }, opts);

    super(args, options);

    this.promptIfMissing(['testDir', 'addons']);
    this.composeWith('component');
  }

  configuring() {
    if (!this.className) {
      this.className = this.compute('className');
    }
  }

  writing() {
    const props = this.getProps();
    props.fileStem = this.compute('fileStem');

    if (this.has('React')) {
      this.fs.copyTpl(this.templatePath('index.test.ejs'), this.destinationPath(_path2.default.join(props.testDir, 'index.test.js')), props);
    }
  }
};
module.exports = exports['default'];