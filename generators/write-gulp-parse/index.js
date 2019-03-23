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
      generator: 'write-gulp-parse'
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'addons', 'listener', 'rule', 'grammar']);
    this.addGulpIncludes(['parse']);
    this.composeWith('write-gulpfile');
  }

  writing() {
    const props = this.getProps();
    const grammarDir = this.dirs('grammarDir');
    const dataDir = this.dirs('dataDir');

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
    props.makeParserOptions = this._makeParserOptions(props);
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

  _consts(props) {
    let consts = `const grammarGlob = ${props.grammarGlob};
const parserDir = '${props.parserDir}';
const dataGlob = ${props.dataGlob};
const grammar = '${props.grammar}';
const rule = '${props.rule}';\n`;

    if (props.parsers.includes('Listener')) {
      consts += `const listener = '${props.listener}';
const listenerDir = '${props.listenerDir}';\n`;
    }

    if (props.parsers.includes('Visitor')) {
      consts += `const visitor = '${props.visitor}';
const visitorDir = '${props.visitorDir}';\n`;
    }

    return consts;
  }

  _makeParserOptions(props) {
    return this.stringify({
      parserDir: props.parserDir,
      listener: props.parsers.includes('Listener'),
      visitor: props.parsers.includes('Visitor')
    }).replace(/\n/g, '\n    ');
  }

  _parseTasks(props) {
    let parseTasks = '';

    if (props.parsers.includes('Listener')) {
      parseTasks += `
export const translate = () => {
  return gulp.src(dataGlob)
    .pipe(antlr4({
      grammar, parserDir, listener, listenerDir, rule,
    }));
};

gulp.task('translate', gulp.series(makeParser, translate));
`;

      if (!props.parsers.includes('Visitor')) {
        parseTasks += `
export const parse = translate;

gulp.task('parse', gulp.series(makeParser, translate));
`;
        return parseTasks;
      }
    }

    if (props.parsers.includes('Visitor')) {
      parseTasks += `
export const interprete = () => {
  return gulp.src(dataGlob)
    .pipe(antlr4({
      grammar, parserDir, visitor, visitorDir, rule,
    }));
};

gulp.task('interprete', gulp.series(makeParser, interprete));
`;

      if (!props.parsers.includes('Listener')) {
        parseTasks += `
export const parse = interprete;

gulp.task('parse', gulp.series(makeParser, interprete));
`;
        return parseTasks;
      }
    }

    parseTasks += `
export const parse = gulp.parallel(translate, interprete);

gulp.task('parse', gulp.series(makeParser, parse));`;

    return parseTasks;
  }
};
module.exports = exports.default;