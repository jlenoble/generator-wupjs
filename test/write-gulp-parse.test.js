import {testGenerator} from './helpers';

testGenerator('write-gulp-parse', {
  grammar: 'MyGrammar',
  listener: 'MyListener',
  rule: 'init',
}, {
  'gulp/parse.js': [
  ],
  'package.json': [
    /"gulp-antlr4": "\*"/,
    /"antlr4": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/parse';/,
  ],
});
