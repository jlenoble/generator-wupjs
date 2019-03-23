'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _camelcase = require('camelcase');

var _camelcase2 = _interopRequireDefault(_camelcase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _base2.default {
  constructor(args, opts) {
    const options = Object.assign({
      generator: 'gulpplugin'
    }, opts);

    super(args, options);

    this.promptIfMissing(['srcDir', 'testDir', 'name']);
    this.addDeps({
      'gulp-util': '*',
      'through2': '*'
    });
    this.addDevDeps({
      'child-process-data': '*'
    });
  }

  initializing() {
    this.argument('className', { type: String, required: false });
  }

  configuring() {
    if (!this.className) {
      this.className = this.compute('className');
    }
  }

  writing() {
    const props = this.getProps();

    let fileStem = this.compute('fileStem');
    const index = fileStem.indexOf('gulp-') === -1 ? 0 : 5;

    props.pluginFunc = (0, _camelcase2.default)(fileStem);

    fileStem = 'gulp-' + fileStem.substring(index);

    props.pluginName = fileStem;

    const filename = fileStem + '.js';
    const testFilename = fileStem + '.test.js';

    props.pluginPath = _path2.default.join(this.rel('gulpfiles:src'), filename);

    const gulpfilesDir = this.dirs('gulpfilesDir');
    props.gulpfileName = 'gulpfile.babel.js';
    props.gulpfilePath = _path2.default.join(gulpfilesDir, props.gulpfileName);
    props.pluginSrcGlob = this.indent([this.globs('sources:**:*'), 2]);

    this.fs.copyTpl(this.templatePath('plugin.ejs'), this.destinationPath(_path2.default.join(props.srcDir, filename)), props);

    this.fs.copyTpl(this.templatePath('plugin.test.ejs'), this.destinationPath(_path2.default.join(props.testDir, testFilename)), props);

    this.fs.copyTpl(this.templatePath('gulpfile.babel.ejs'), this.destinationPath(props.gulpfilePath), props);
  }
};
module.exports = exports.default;