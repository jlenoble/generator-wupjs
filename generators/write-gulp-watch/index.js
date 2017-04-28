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
      props.allSrcGlob = this.compute('allSrcGlob');
      props.allBuildGlob = this.compute('allBuildGlob');
      props.importBundles = this.compute('importBundles');
      props.importSassFromSass = this.compute('importSassFromSass');
      props.gulpWatchTasks = this._gulpWatchTasks();

      this.fs.copyTpl(this.templatePath('watch.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'watch.js')), props);
    }
  }, {
    key: '_gulpWatchTasks',
    value: function _gulpWatchTasks() {
      var tasks = 'gulp.watch(allSrcGlob, build);\n';

      if (this.has('React') || this.has('Compass')) {
        tasks += 'gulp.watch(srcBuildGlob, bundle);\n';
        tasks += 'gulp.watch(allBuildGlob, testBundle);\n';
        tasks += 'gulp.watch(testBundleGlob, test);\n';
      } else {
        tasks += 'gulp.watch(allBuildGlob, test);\n';
      }

      if (this.has('Compass')) {
        tasks += 'gulp.watch(allSassGlob, sass);\n';
      }

      return tasks.replace(/\n/g, '\n  ');
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];