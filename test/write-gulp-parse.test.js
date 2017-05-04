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
    /\.pipe\(antlr4\(parserDir\)\);/,
    /\.pipe\(antlr4\(\{\s+grammar, parserDir, listener, listenerDir, rule/,
  ],
  'package.json': [
    /"gulp-antlr4": "\*"/,
    /"antlr4": "\*"/,
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
