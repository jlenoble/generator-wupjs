'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsonStableStringify = require('json-stable-stringify');

var _jsonStableStringify2 = _interopRequireDefault(_jsonStableStringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
  _inherits(_class, _Base);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    var options = Object.assign({
      generator: 'write-gulp-serve'
    }, opts);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));

    _this.promptIfMissing(['gulpDir', 'srcDir', 'buildDir', 'preprocessors']);
    _this.addGulpIncludes(['serve']);
    _this.addDevDeps({ 'browser-sync': '*' });
    _this.composeWith('write-gulp-bundle');
    return _this;
  }

  _createClass(_class, [{
    key: 'configuring',
    value: function configuring() {
      if (this.has('Compass')) {
        this.composeWith('write-gulp-sass');
      }
    }
  }, {
    key: 'writing',
    value: function writing() {
      var props = this.getProps();
      props.imports = this._imports();
      props.consts = this._consts();
      props.preServeTask = this._preServeTask();

      this.fs.copyTpl(this.templatePath('serve.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'serve.js')), props);
    }
  }, {
    key: '_consts',
    value: function _consts() {
      var consts = 'const buildDir = \'' + this.dirs('buildDir') + '\';\nconst staticDir = \'' + this.dirs('staticDir') + '\';\nconst nodeDir = \'' + this.dirs('nodeDir') + '\';\nconst bsWatchGlob = ';

      if (this.has('Compass')) {
        consts += (0, _jsonStableStringify2.default)([_path2.default.join(this.dirs('staticDir'), 'index.html'), _path2.default.join(this.get('buildDir'), this.compute('bundleName')), _path2.default.join(this.dirs('cssDir'), '**/*.scss')], { space: 2 }).replace(/"/g, '\'');
      } else {
        consts += (0, _jsonStableStringify2.default)([_path2.default.join(this.dirs('staticDir'), 'index.html'), _path2.default.join(this.get('buildDir'), this.compute('bundleName'))], { space: 2 }).replace(/"/g, '\'');
      }

      consts += ';';

      return consts;
    }
  }, {
    key: '_imports',
    value: function _imports() {
      return 'import \'./bundle\';' + (this.has('Compass') ? '\nimport \'./sass\';' : '');
    }
  }, {
    key: '_preServeTask',
    value: function _preServeTask() {
      return this.has('Compass') ? 'gulp.parallel(\'bundle\', \'sass\')' : '\'bundle\'';
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];