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
      generator: 'write-gulp-doc'
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'addons', 'buildDir', 'name', 'description']);
    this.addGulpIncludes(['doc']);
    this.addDevDeps({
      'gulp-rename': '*',
      'gulp-replace': '*',
      'gulp-wrap': '*',
      'markdown-include': '*'
    });
    this.composeWith('who');
    this.composeWith('license');
    this.composeWith('write-gulpfile');
  }

  writing() {
    const props = this.getProps();
    props.contents = this._contents();
    props.docConf = this.filepaths('docConf');
    props.name = this.get('name');
    props.cYear = this.compute('cYear');

    this.fs.copyTpl(this.templatePath('doc.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'doc.js')), props);

    this.fs.copyTpl(this.templatePath('index.ejs'), this.destinationPath(_path2.default.join(this.dirs('docDir'), 'index.md')), props);

    this.fs.copyTpl(this.templatePath('markdown.ejs'), this.destinationPath('markdown.json'), props);
  }

  _contents() {
    return `<%= contents %>`;
  }
};
module.exports = exports.default;