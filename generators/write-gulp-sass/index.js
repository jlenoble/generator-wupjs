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
      generator: 'write-gulp-sass'
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'buildDir', 'srcDir', 'preprocessors']);
    this.addGulpIncludes(['sass']);
    this.composeWith('write-gulpfile');
    this.addDevDeps({ 'gulp-sourcemaps': '*' });
  }

  writing() {
    const props = this.getProps();

    this.fs.copyTpl(this.templatePath('sass.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'sass.js')), props);
  }
};
module.exports = exports.default;