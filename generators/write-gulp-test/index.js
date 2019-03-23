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
      generator: 'write-gulp-test'
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'testDir', 'buildDir', 'addons', 'preprocessors']);
    this.addDevDeps({ 'chai': '*' });
    this.addGulpIncludes(['test']);
    this.composeWith('write-gulpfile');
  }

  configuring() {
    if (this.has('React')) {
      this.addDevDeps({
        'gulp-mocha-phantomjs': '*',
        'mocha': '*'
      });
    } else {
      this.addDevDeps({
        'gulp-mocha': '*'
      });
    }
  }

  writing() {
    const props = this.getProps();
    props.imports = this._imports();
    props.testGlob = this._testGlob();
    props.gulpMochaCallback = this._gulpMochaCallback();
    props.onMochaEnd = this._onMochaEnd();
    props.preTestTask = this._preTestTask();

    this.fs.copyTpl(this.templatePath('test.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'test.js')), props);
  }

  _gulpMocha() {
    return this.has('PhantomJS') ? 'gulp-mocha-phantomjs' : 'gulp-mocha';
  }

  _gulpMochaCallback() {
    return this.has('PhantomJS') ? 'done' : '()';
  }

  _imports() {
    let imports = `import gulp from 'gulp';
import mocha from '${this._gulpMocha()}';
import '${this.has('React') ? './test-bundle' : './build'}';\n`;

    if (this.has('Compass')) {
      imports += `\nimport './sass';\n`;
    }

    if (this.has('ANTLR4')) {
      imports += `import './parse';\n`;
    }

    return imports;
  }

  _onMochaEnd() {
    return this.has('PhantomJS') ? `
      .on('end', done)` : '';
  }

  _preTestTask() {
    let pretasks = [];

    if (this.has('ANTLR4')) {
      pretasks.push('parse');
    }

    pretasks.push(this.has('PhantomJS') ? 'test-bundle' : 'build');

    if (this.has('Compass')) {
      pretasks.push('sass');
    }

    pretasks = pretasks.map(task => `'${task}'`);

    if (pretasks.length > 1) {
      pretasks = 'gulp.parallel(' + pretasks.join(', ') + ')';
    } else if (pretasks.length === 1) {
      pretasks = pretasks[0];
    } else {
      pretasks = `'build'`;
    }

    return pretasks;
  }

  _testGlob() {
    return this.has('PhantomJS') ? `'${this.filepaths('runnerPage')}'` : this.globs('build#test:**:test.js');
  }
};
module.exports = exports.default;