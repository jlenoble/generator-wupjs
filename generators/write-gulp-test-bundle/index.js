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
      generator: 'write-gulp-test-bundle'
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'buildDir', 'addons']);
    this.addDevDeps({
      'browserify': '*',
      'vinyl-buffer': '*',
      'vinyl-source-stream': '*'
    });
    this.addGulpIncludes(['test-bundle']);
    this.composeWith('write-gulpfile');
  }

  configuring() {
    if (this.has('React')) {
      this.addDevDeps({
        'mocha': '*'
      });
    }
  }

  writing() {
    const props = this.getProps();
    props.testBundleRoot = this.filepaths('testBundleRoot');
    props.testBundleName = this.filenames('testBundle');
    props.externalReact = this.compute('externalReact');

    this.fs.copyTpl(this.templatePath('test-bundle.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'test-bundle.js')), props);
  }
};
module.exports = exports.default;