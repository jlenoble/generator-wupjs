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
      generator: 'write-gulp-dist'
    }, opts);

    super(args, options);

    this.promptIfMissing(['babel', 'gulpDir', 'buildDir', 'srcDir', 'linters', 'preprocessors']);
    this.addGulpIncludes(['dist']);
    this.composeWith('write-gulpfile');
  }

  writing() {
    const props = this.getProps();
    props.imports = this._imports();
    props.pipeBabel = this.compute('pipeBabel');
    props.distSass = this._distSass();
    props.distTask = this._distTask();

    this.fs.copyTpl(this.templatePath('dist.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'dist.js')), props);
  }

  _distSass() {
    return this.has('Compass') ? `
export const distSass = () => {
  return gulp.src(${this.globs('sass:*')}, {
    base: process.cwd(),
    since: gulp.lastRun(distSass),
  })
  .pipe(compass({
    project: path.join(__dirname, '..'),
    css: '${this.dirs('libDir')}',
    sass: '${this.dirs('sassDir')}',
    import_path: '${this.dirs('sassImportDir')}',
  }))
  .pipe(gulp.dest('${this.dirs('libDir')}'));
};
` : '';
  }

  _distTask() {
    return this.has('Compass') ? 'gulp.parallel(dist, distSass)' : 'dist';
  }

  _imports() {
    let imports = `import gulp from 'gulp';\n`;

    if (this.has('Babel')) {
      imports += `import babel from 'gulp-babel';\n`;
    }

    if (this.has('Compass')) {
      imports += `import compass from 'gulp-compass';\n`;
      imports += `import path from 'path';\n`;
    }

    return imports;
  }
};
module.exports = exports['default'];