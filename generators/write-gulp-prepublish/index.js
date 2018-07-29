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
      generator: 'write-gulp-prepublish'
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir']);
    this.addGulpIncludes(['prepublish']);
    this.composeWith('write-gulp-test');
    this.composeWith('write-gulp-dist');
    this.composeWith('write-gulp-doc');
    this.composeWith('write-gulp-distclean');
    this.composeWith('write-gulpfile');
  }

  writing() {
    const props = this.getProps();

    this.fs.copyTpl(this.templatePath('prepublish.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'prepublish.js')), props);
  }
};
module.exports = exports['default'];