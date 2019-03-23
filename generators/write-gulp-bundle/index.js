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
      generator: 'write-gulp-bundle'
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'buildDir', 'addons']);
    this.addDevDeps({
      'browserify': '*',
      'vinyl-buffer': '*',
      'vinyl-source-stream': '*'
    });
    this.addGulpIncludes(['bundle']);
    this.composeWith('write-gulpfile');
  }

  writing() {
    const props = this.getProps();
    props.bundleRoot = this.filepaths('bundleRoot');
    props.bundleName = this.filenames('bundle');
    props.externalReact = this.compute('externalReact');

    this.fs.copyTpl(this.templatePath('bundle.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'bundle.js')), props);
  }
};
module.exports = exports.default;