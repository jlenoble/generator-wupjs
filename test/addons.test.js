import {testGenerator} from './helpers';

testGenerator('addons', {addons: ['React']}, {
  '.yo-rc.json': [
    /"addons"/,
    /"React"/,
    /"babel-preset-react": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
  ],
  'package.json': [
    /"babel-preset-react": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
  ],
});

testGenerator('addons', {addons: ['Enzyme']}, {
  '.yo-rc.json': [
    /"addons"/,
    /"React"/,
    /"Enzyme"/,
    /"babel-preset-react": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
    /"chai-enzyme": "\*"/,
    /"enzyme": "\*"/,
    /"react-test-renderer": "\*"/,
  ],
  'package.json': [
    /"babel-preset-react": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
    /"chai-enzyme": "\*"/,
    /"enzyme": "\*"/,
    /"react-test-renderer": "\*"/,
  ],
});

testGenerator('addons', {addons: ['ANTLR4']}, {
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
