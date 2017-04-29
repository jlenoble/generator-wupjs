'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
  _inherits(_class, _Base);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    var options = Object.assign({
      generator: 'write-gulp-dist'
    }, opts);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));

    _this.promptIfMissing(['babel', 'gulpDir', 'buildDir', 'srcDir', 'linters', 'preprocessors']);
    _this.addGulpIncludes(['dist']);
    _this.composeWith('write-gulpfile');
    return _this;
  }

  _createClass(_class, [{
    key: 'writing',
    value: function writing() {
      var props = this.getProps();
      props.imports = this._imports();
      props.pipeBabel = this.compute('pipeBabel');
      props.distSass = this._distSass();
      props.distTask = this._distTask();

      this.fs.copyTpl(this.templatePath('dist.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'dist.js')), props);
    }
  }, {
    key: '_distSass',
    value: function _distSass() {
      return this.has('Compass') ? '\nexport const distSass = () => {\n  return gulp.src(' + this.globs('sass:*') + ', {\n    base: process.cwd(),\n    since: gulp.lastRun(distSass),\n  })\n  .pipe(compass({\n    project: path.join(__dirname, \'..\'),\n    css: \'' + this.dirs('libDir') + '\',\n    sass: \'' + this.dirs('sassDir') + '\',\n    import_path: \'' + this.dirs('sassImportDir') + '\',\n  }))\n  .pipe(gulp.dest(\'' + this.dirs('libDir') + '\'));\n};\n' : '';
    }
  }, {
    key: '_distTask',
    value: function _distTask() {
      return this.has('Compass') ? 'gulp.parallel(dist, distSass)' : 'dist';
    }
  }, {
    key: '_imports',
    value: function _imports() {
      var imports = 'import gulp from \'gulp\';\n';

      if (this.has('Babel')) {
        imports += 'import babel from \'gulp-babel\';\n';
      }

      if (this.has('Compass')) {
        imports += 'import compass from \'gulp-compass\';\n';
        imports += 'import path from \'path\';\n';
      }

      return imports;
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];