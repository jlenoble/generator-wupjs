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
      generator: 'write-gulp-watch'
    }, opts);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));

    _this.promptIfMissing(['gulpDir', 'addons', 'preprocessors']);
    _this.addGulpIncludes(['watch']);
    return _this;
  }

  _createClass(_class, [{
    key: 'writing',
    value: function writing() {
      var props = this.getProps();
      props.parsers = this.get('parsers');

      props.consts = this._consts(props);
      props.imports = this._imports();
      props.gulpWatchTasks = this._gulpWatchTasks();

      this.fs.copyTpl(this.templatePath('watch.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'watch.js')), props);
    }
  }, {
    key: '_consts',
    value: function _consts(props) {
      var consts = 'const allSrcGlob = ' + this.globs('src,test,!parser:**:js') + ';\nconst allBuildGlob = ' + this.globs('build#src,test:**:js') + ';\n';

      if (this.has('Compass')) {
        consts += 'const allSassGlob = ' + this.globs('sass:**') + ';\n';
      }

      if (this.has('PhantomJS')) {
        consts += 'const srcBuildGlob = ' + this.globs('build#src:**:js') + ';\nconst testBundleGlob = \'' + this.filepaths('testBundle') + '\';\n';
      }

      if (this.has('ANTLR4')) {
        var hints = ['data:**:*', 'parser:' + this.get('grammar') + 'Parser.js'];

        if (props.parsers.includes('Listener')) {
          hints.push('listener:' + this.get('listener') + '.js');
        }

        if (props.parsers.includes('Visitor')) {
          hints.push('visitor:' + this.get('visitor') + '.js');
        }

        consts += 'const grammarGlob = ' + this.globs('grammar:**:g4') + ';\n';
        consts += 'const dataGlob = ' + this.globs(hints) + ';\n';
      }

      return consts;
    }
  }, {
    key: '_gulpWatchTasks',
    value: function _gulpWatchTasks() {
      var tasks = 'gulp.watch(allSrcGlob, build);\n';

      if (this.has('PhantomJS')) {
        tasks += 'gulp.watch(srcBuildGlob, bundle);\n';
        tasks += 'gulp.watch(allBuildGlob, testBundle);\n';
        tasks += 'gulp.watch(testBundleGlob, test);\n';
      } else {
        tasks += 'gulp.watch(allBuildGlob, test);\n';
      }

      if (this.has('Compass')) {
        tasks += 'gulp.watch(allSassGlob, sass);\n';
      }

      if (this.has('ANTLR4')) {
        tasks += 'gulp.watch(grammarGlob, makeParser);\n';
        tasks += 'gulp.watch(dataGlob, parse);\n';
      }

      return tasks.replace(/\n/g, '\n  ');
    }
  }, {
    key: '_imports',
    value: function _imports() {
      var imports = 'import gulp from \'gulp\';\nimport {build} from \'./build\';\nimport {test} from \'./test\';\n';

      if (this.has('PhantomJS')) {
        if (this.has('Compass')) {
          imports += 'import {sass} from \'./sass\';\n';
        }
        imports += 'import {bundle} from \'./bundle\';\nimport {testBundle} from \'./test-bundle\';\n';
      }

      if (this.has('ANTLR4')) {
        imports += 'import {makeParser, parse} from \'./parse\';\n';
      }

      return imports;
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];