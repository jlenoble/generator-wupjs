import {testGenerator} from './helpers';

testGenerator('write-gulp-parse', {
  grammar: 'Calc',
  listener: 'MyListener',
  rule: 'init',
}, {
  'gulp/parse.js': [
    /import antlr4 from 'gulp-antlr4';/,
    /const grammarGlob = \[/,
    /const parserDir = 'src\/static\/antlr4\/parsers';/,
    /const dataGlob = \[/,
    /const grammar = 'Calc';/,
    /const listener = 'MyListener';/,
    /const listenerDir = 'src\/static\/antlr4';/,
    /const rule = 'init';/,
    /\.pipe\(antlr4\(\{\s+'listener': true,\s+'parserDir': 'src\/static\/antlr4\/parsers',\s+'visitor': false\s+\}\)\);/,
    /\.pipe\(antlr4\(\{\s+grammar, parserDir, listener, listenerDir, rule/,
    /gulp\.task\('translate', gulp\.series\(makeParser, translate\)\);/,
  ],
  'package.json': [
    /"gulp-antlr4": "\*"/,
    /"antlr4": "\*"/,
    /"gulp-util": "\*"/,
    /"through2": "\*"/,
    /"child-process-data": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/parse';/,
  ],
  'src/static/antlr4/grammars/Calc.g4': true,
  'src/static/antlr4/MyListener.js': [
    /const rel = path\.relative\(base, 'src\/static\/antlr4\/parsers'\);/,
    /const \{CalcListener\} = require\(path\.join\(base, rel,\s+'CalcListener'\)\);/,
    /export class MyListener extends CalcListener \{/,
  ],
  'src/static/data/data.txt': true,
});

testGenerator('write-gulp-parse', {
  parsers: ['Visitor'],
  grammar: 'Calc',
  visitor: 'MyVisitor',
  rule: 'init',
}, {
  'gulp/parse.js': [
    /import antlr4 from 'gulp-antlr4';/,
    /const grammarGlob = \[/,
    /const parserDir = 'src\/static\/antlr4\/parsers';/,
    /const dataGlob = \[/,
    /const grammar = 'Calc';/,
    /const visitor = 'MyVisitor';/,
    /const visitorDir = 'src\/static\/antlr4';/,
    /const rule = 'init';/,
    /\.pipe\(antlr4\(\{\s+'listener': false,\s+'parserDir': 'src\/static\/antlr4\/parsers',\s+'visitor': true\s+\}\)\);/,
    /\.pipe\(antlr4\(\{\s+grammar, parserDir, visitor, visitorDir, rule/,
    /gulp\.task\('interprete', gulp\.series\(makeParser, interprete\)\);/,
  ],
  'package.json': [
    /"gulp-antlr4": "\*"/,
    /"antlr4": "\*"/,
    /"gulp-util": "\*"/,
    /"through2": "\*"/,
    /"child-process-data": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/parse';/,
  ],
  'src/static/antlr4/grammars/Calc.g4': true,
  'src/static/antlr4/MyVisitor.js': [
    /const rel = path\.relative\(base, 'src\/static\/antlr4\/parsers'\);/,
    /const \{CalcVisitor\} = require\(path\.join\(base, rel,\s+'CalcVisitor'\)\);/,
    /export class MyVisitor extends CalcVisitor \{/,
  ],
  '!src/static/antlr4/MyListener.js': false,
  'src/static/data/data.txt': true,
});
