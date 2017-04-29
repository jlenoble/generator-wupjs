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
      generator: 'write-gulp-test'
    }, opts);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));

    _this.promptIfMissing(['gulpDir', 'testDir', 'buildDir', 'addons', 'preprocessors']);
    _this.addDevDeps({ 'chai': '*' });
    _this.addGulpIncludes(['test']);
    _this.composeWith('write-gulpfile');
    return _this;
  }

  _createClass(_class, [{
    key: 'configuring',
    value: function configuring() {
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
  }, {
    key: 'writing',
    value: function writing() {
      var props = this.getProps();
      props.imports = this._imports();
      props.testGlob = this._testGlob();
      props.gulpMochaCallback = this._gulpMochaCallback();
      props.onMochaEnd = this._onMochaEnd();
      props.preTestTask = this._preTestTask();

      this.fs.copyTpl(this.templatePath('test.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'test.js')), props);
    }
  }, {
    key: '_gulpMocha',
    value: function _gulpMocha() {
      return this.has('PhantomJS') ? 'gulp-mocha-phantomjs' : 'gulp-mocha';
    }
  }, {
    key: '_gulpMochaCallback',
    value: function _gulpMochaCallback() {
      return this.has('PhantomJS') ? 'done' : '()';
    }
  }, {
    key: '_imports',
    value: function _imports() {
      var imports = 'import gulp from \'gulp\';\nimport mocha from \'' + this._gulpMocha() + '\';\nimport \'' + (this.has('React') ? './test-bundle' : './build') + '\'';

      if (this.has('Compass')) {
        imports += '\nimport \'./sass\';';
      }

      return imports;
    }
  }, {
    key: '_onMochaEnd',
    value: function _onMochaEnd() {
      return this.has('PhantomJS') ? '\n      .on(\'end\', done)' : '';
    }
  }, {
    key: '_preTestTask',
    value: function _preTestTask() {
      if (this.has('Compass')) {
        return this.has('React') ? 'gulp.parallel(\'test-bundle\', \'sass\')' : 'gulp.parallel(\'build\', \'sass\')';
      } else {
        return '\'' + (this.has('React') ? 'test-bundle' : 'build') + '\'';
      }
    }
  }, {
    key: '_testGlob',
    value: function _testGlob() {
      return this.has('PhantomJS') ? '\'' + this.filepaths('runnerPage') + '\'' : this.globs('build#test:**:test.js');
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];