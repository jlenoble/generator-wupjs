'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _camelcase = require('camelcase');

var _camelcase2 = _interopRequireDefault(_camelcase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
  _inherits(_class, _Base);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    var options = Object.assign({
      generator: 'gulpplugin'
    }, opts);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));

    _this.promptIfMissing(['srcDir', 'testDir', 'name']);
    _this.addDeps({
      'gulp-util': '*',
      'through2': '*'
    });
    _this.addDevDeps({
      'child-process-data': '*'
    });
    return _this;
  }

  _createClass(_class, [{
    key: 'initializing',
    value: function initializing() {
      this.argument('className', { type: String, required: false });
    }
  }, {
    key: 'configuring',
    value: function configuring() {
      if (!this.className) {
        this.className = this.compute('className');
      }
    }
  }, {
    key: 'writing',
    value: function writing() {
      var props = this.getProps();

      var fileStem = this.compute('fileStem');
      var index = fileStem.indexOf('gulp-') === -1 ? 0 : 5;

      props.pluginFunc = (0, _camelcase2.default)(fileStem);

      fileStem = 'gulp-' + fileStem.substring(index);

      props.pluginName = fileStem;

      var filename = fileStem + '.js';
      var testFilename = fileStem + '.test.js';

      props.pluginPath = _path2.default.join(this.rel('gulpfiles:src'), filename);

      var gulpfilesDir = this.dirs('gulpfilesDir');
      props.gulpfileName = 'gulpfile.babel.js';
      props.gulpfilePath = _path2.default.join(gulpfilesDir, props.gulpfileName);
      props.pluginSrcGlob = this.indent([this.globs('sources:**:*'), 2]);

      this.fs.copyTpl(this.templatePath('plugin.ejs'), this.destinationPath(_path2.default.join(props.srcDir, filename)), props);

      this.fs.copyTpl(this.templatePath('plugin.test.ejs'), this.destinationPath(_path2.default.join(props.testDir, testFilename)), props);

      this.fs.copyTpl(this.templatePath('gulpfile.babel.ejs'), this.destinationPath(props.gulpfilePath), props);
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];