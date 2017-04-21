import {testGenerator} from './helpers';

testGenerator('write-gulp-dist', {babel: 'es2015', linters: ['EsLint']}, {
  'gulp/dist.js': [
    /import babel from 'gulp-babel';/,
    /const buildDir = 'build';/,
    /const allSrcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /'test\/\*\*\/\*\.js'/,
    /\.pipe\(babel\(\)\)/,
  ],
  'gulp/lint.js': true,
  '.babelrc': true,
  '.eslintrc': true,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/dist';/,
  ],
});

testGenerator('write-gulp-dist', {babel: 'es2015', linters: []}, {
  'gulp/dist.js': [
    /import babel from 'gulp-babel';/,
    /const buildDir = 'build';/,
    /const allSrcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /'test\/\*\*\/\*\.js'/,
    /\.pipe\(babel\(\)\)/,
  ],
  'gulp/lint.js': false,
  '.babelrc': true,
  '.eslintrc': false,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/dist';/,
  ],
});

testGenerator('write-gulp-dist', {babel: 'none', linters: []}, {
  'gulp/dist.js': [
    /const buildDir = 'build';/,
    /const allSrcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /'test\/\*\*\/\*\.js'/,
  ],
  '!gulp/dist.js': [
    /import babel from 'gulp-babel';/,
    /\.pipe\(babel\(\)\)/,
  ],
  'gulp/lint.js': false,
  '.babelrc': false,
  '.eslintrc': false,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/dist';/,
  ],
});
