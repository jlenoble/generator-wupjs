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
      generator: 'write-gulp-serve'
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'srcDir', 'buildDir', 'preprocessors']);
    this.addGulpIncludes(['serve']);
    this.addDevDeps({ 'browser-sync': '*' });
    this.composeWith('write-gulp-bundle');
  }

  configuring() {
    if (this.has('Compass')) {
      this.composeWith('write-gulp-sass');
    }
  }

  writing() {
    const props = this.getProps();
    props.imports = this._imports();
    props.consts = this._consts();
    props.preServeTask = this._preServeTask();

    this.fs.copyTpl(this.templatePath('serve.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'serve.js')), props);
  }

  _consts() {
    let consts = `const buildDir = '${this.dirs('buildDir')}';
const staticDir = '${this.dirs('staticDir')}';
const nodeDir = '${this.dirs('nodeDir')}';
const bsWatchGlob = `;

    if (this.has('Compass')) {
      consts += this.stringify([_path2.default.join(this.dirs('staticDir'), 'index.html'), _path2.default.join(this.get('buildDir'), this.filenames('bundle')), _path2.default.join(this.dirs('cssDir'), '**/*.scss')]);
    } else {
      consts += this.stringify([_path2.default.join(this.dirs('staticDir'), 'index.html'), _path2.default.join(this.get('buildDir'), this.filenames('bundle'))]);
    }

    consts += ';';

    return consts;
  }

  _imports() {
    return `import './bundle';${this.has('Compass') ? '\nimport \'./sass\';' : ''}`;
  }

  _preServeTask() {
    return this.has('Compass') ? `gulp.parallel('bundle', 'sass')` : `'bundle'`;
  }
};
module.exports = exports.default;