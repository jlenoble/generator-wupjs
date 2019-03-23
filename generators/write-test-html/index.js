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
      generator: 'write-test-html'
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'testDir', 'buildDir', 'addons']);
    this.addDevDeps({ 'mocha': '*' });
    this.composeWith('write-gulp-test-bundle');
  }

  writing() {
    const props = this.getProps();
    props.browserMocha = this._browserMocha();
    props.testBundleGlob = this._testBundleGlob();

    this.fs.copyTpl(this.templatePath('runner.ejs'), this.destinationPath(this.filepaths('runnerPage')), props);
  }

  _browserMocha() {
    return _path2.default.join(this.rel('build:node'), 'mocha/mocha.js');
  }

  _testBundleGlob() {
    return _path2.default.join(this.rel('test:build'), this.filenames('testBundle'));
  }
};
module.exports = exports.default;