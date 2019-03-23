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
    /"gulp-eslint": "\d+\.\d+\.\d+"/,
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
    /"gulp-eslint": "\d+\.\d+\.\d+"/,
    /"react": "\d+\.\d+\.\d+"/,
    /"react-dom": "\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/lint';/,
  ],
});
