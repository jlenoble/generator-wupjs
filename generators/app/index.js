'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _base2.default {
  constructor(args, opts) {
    const options = Object.assign({
      generator: 'app'
    }, opts);

    super(args, options);

    this.composeWith('module');
    this.composeWith('who');
    this.composeWith('github');
    this.composeWith('license');
    this.composeWith('babel');
    this.composeWith('lint');
    this.composeWith('addons');
    this.composeWith('preprocessors');
    this.composeWith('test');
    this.composeWith('write-gulpfile');
    this.composeWith('write-gulp-build');
    this.composeWith('write-gulp-clean');
    this.composeWith('write-gulp-distclean');
    this.composeWith('write-gulp-dist');
    this.composeWith('write-gulp-doc');
    this.composeWith('write-gulp-prepublish');
    this.composeWith('write-gulp-tdd');
    this.composeWith('write-gulp-watch');
    this.composeWith('write-src');
  }

  initializing() {
    this.log((0, _yosay2.default)('Welcome to our ' + _chalk2.default.red('generator-wupjs') + ' generator!'));
  }

  configuring() {
    if (this.has('React')) {
      this.composeWith('write-gulp-serve');
      this.composeWith('write-gulp-bundle');
      this.composeWith('write-gulp-test-bundle');
      this.composeWith('write-src-html');
      this.composeWith('write-test-html');
      this.composeWith('write-test-index');
      this.composeWith('write-demo');
    }
  }

  install() {
    this.installDependencies();
  }
};
module.exports = exports['default'];