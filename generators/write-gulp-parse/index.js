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
      generator: 'write-gulp-parse'
    }, opts);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));

    _this.promptIfMissing(['gulpDir', 'addons', 'listener', 'rule', 'grammar']);
    _this.addGulpIncludes(['parse']);
    _this.composeWith('write-gulpfile');
    return _this;
  }

  _createClass(_class, [{
    key: 'writing',
    value: function writing() {
      var props = this.getProps();
      var grammarDir = this.dirs('grammarDir');
      var dataDir = this.dirs('dataDir');

      props.parsers = this.get('parsers');
      props.parserDir = this.dirs('parserDir');
      props.listenerDir = this.dirs('listenerDir');
      props.visitorDir = this.dirs('visitorDir');
      props.grammarGlob = this.globs('grammar:**:g4');
      props.dataGlob = this.globs('data:**:*');
      props.listener = this.get('listener');
      props.visitor = this.get('visitor');
      props.rule = this.get('rule');
      props.grammar = this.get('grammar');

      props.consts = this._consts(props);
      props.parseTasks = this._parseTasks(props);

      this.fs.copyTpl(this.templatePath('parse.ejs'), this.destinationPath(_path2.default.join(props.gulpDir, 'parse.js')), props);

      this.fs.copyTpl(this.templatePath('grammar.ejs'), this.destinationPath(_path2.default.join(grammarDir, 'Calc.g4')), props);

      this.fs.copyTpl(this.templatePath('data.ejs'), this.destinationPath(_path2.default.join(dataDir, 'data.txt')), props);

      if (props.parsers.includes('Listener')) {
        this.fs.copyTpl(this.templatePath('listener.ejs'), this.destinationPath(_path2.default.join(props.listenerDir, props.listener + '.js')), props);
      }

      if (props.parsers.includes('Visitor')) {
        this.fs.copyTpl(this.templatePath('visitor.ejs'), this.destinationPath(_path2.default.join(props.visitorDir, props.visitor + '.js')), props);
      }
    }
  }, {
    key: '_consts',
    value: function _consts(props) {
      var consts = 'const grammarGlob = ' + props.grammarGlob + ';\nconst parserDir = \'' + props.parserDir + '\';\nconst dataGlob = ' + props.dataGlob + ';\nconst grammar = \'' + props.grammar + '\';\nconst rule = \'' + props.rule + '\';\n';

      if (props.parsers.includes('Listener')) {
        consts += 'const listener = \'' + props.listener + '\';\nconst listenerDir = \'' + props.listenerDir + '\';\n';
      }

      if (props.parsers.includes('Visitor')) {
        consts += 'const visitor = \'' + props.visitor + '\';\nconst visitorDir = \'' + props.visitorDir + '\';\n';
      }

      return consts;
    }
  }, {
    key: '_parseTasks',
    value: function _parseTasks(props) {
      var parseTasks = '';

      if (props.parsers.includes('Listener')) {
        parseTasks += '\nexport const translate = () => {\n  return gulp.src(dataGlob, {\n    since: gulp.lastRun(translate),\n  })\n    .pipe(antlr4({\n      grammar, parserDir, listener, listenerDir, rule,\n    }));\n};\n\ngulp.task(\'translate\', gulp.series(makeParser, translate));\n';

        if (!props.parsers.includes('Visitor')) {
          parseTasks += '\ngulp.task(\'parse\', gulp.series(makeParser, translate));\n';
          return parseTasks;
        }
      }

      if (props.parsers.includes('Visitor')) {
        parseTasks += '\nexport const interprete = () => {\n  return gulp.src(dataGlob, {\n    since: gulp.lastRun(interprete),\n  })\n    .pipe(antlr4({\n      grammar, parserDir, visitor, visitorDir, rule,\n    }));\n};\n\ngulp.task(\'interprete\', gulp.series(makeParser, interprete));\n';

        if (!props.parsers.includes('Listener')) {
          parseTasks += '\ngulp.task(\'parse\', gulp.series(makeParser, interprete));\n';
          return parseTasks;
        }
      }

      parseTasks += '\ngulp.task(\'parse\', gulp.series(makeParser, gulp.parallel(\n  translate, interprete)));\n';

      return parseTasks;
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];