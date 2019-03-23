import {testGenerator} from './helpers';

testGenerator('addons', {addons: ['React']}, {
  '.yo-rc.json': [
    /"addons"/,
    /"React"/,
    /"babel-preset-react": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /"babel-preset-react": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
});

testGenerator('addons', {addons: ['Enzyme']}, {
  '.yo-rc.json': [
    /"addons"/,
    /"React"/,
    /"Enzyme"/,
    /"babel-preset-react": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
    /"chai-enzyme": "\^\d+\.\d+\.\d+"/,
    /"enzyme": "\^\d+\.\d+\.\d+"/,
    /"react-test-renderer": "\^\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /"babel-preset-react": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
    /"chai-enzyme": "\^\d+\.\d+\.\d+"/,
    /"enzyme": "\^\d+\.\d+\.\d+"/,
    /"react-test-renderer": "\^\d+\.\d+\.\d+"/,
  ],
});

testGenerator('addons', {
  addons: ['ANTLR4'],
  grammar: 'MyGrammar',
  listener: 'MyListener',
  rule: 'init',
}, {
  '.yo-rc.json': [
    /"addons"/,
    /"antlr4"/,
    /"gulp-antlr4"/,
  ],
  'package.json': [
    /"antlr4"/,
    /"gulp-antlr4"/,
  ],
});

testGenerator('addons', {
  addons: ['ANTLR4'],
  parsers: ['Visitor'],
  grammar: 'MyGrammar',
  visitor: 'MyVisitor',
  rule: 'init',
}, {
  '.yo-rc.json': [
    /"addons"/,
    /"antlr4"/,
    /"gulp-antlr4"/,
  ],
  'package.json': [
    /"antlr4"/,
    /"gulp-antlr4"/,
  ],
});
