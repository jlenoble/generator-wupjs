import {testGenerator} from './helpers';

testGenerator('write-gulp-lint', undefined, {
  'gulp/lint.js': [
    /import eslint from 'gulp-eslint';/,
    /const allSrcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /'test\/\*\*\/\*\.js'/,
    /\.pipe\(eslint\(\)\)/,
    /\.pipe\(eslint\.format\(\)\)/,
  ],
  'package.json': [
    /"gulp-eslint": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/lint';/,
  ],
});

testGenerator('write-gulp-lint', {addons: ['React']}, {
  'gulp/lint.js': [
    /import eslint from 'gulp-eslint';/,
    /const allSrcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /'src\/\*\*\/\*\.jsx'/,
    /'test\/\*\*\/\*\.js'/,
    /'test\/\*\*\/\*\.jsx'/,
    /\.pipe\(eslint\(\)\)/,
    /\.pipe\(eslint\.format\(\)\)/,
  ],
  'package.json': [
    /"gulp-eslint": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/lint';/,
  ],
});
