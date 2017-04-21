import {testGenerator} from './helpers';

testGenerator('write-gulp-dist', {babel: 'es2015', linters: ['EsLint']}, {
  'gulp/dist.js': [
    /import babel from 'gulp-babel';/,
    /const buildDir = 'build';/,
    /const allSrcGlob = 'src\/\*\*\/\*\.js';/,
    /\.pipe\(babel\(\)\)/,
  ],
  'gulp/lint.js': [],
  '.babelrc': [],
  '.eslintrc': [],
});

testGenerator('write-gulp-dist', {babel: 'es2015', linters: []}, {
  'gulp/dist.js': [
    /import babel from 'gulp-babel';/,
    /const buildDir = 'build';/,
    /const allSrcGlob = 'src\/\*\*\/\*\.js';/,
    /\.pipe\(babel\(\)\)/,
  ],
  'gulp/lint.js': false,
  '.babelrc': [],
  '.eslintrc': false,
});

testGenerator('write-gulp-dist', {babel: 'none', linters: []}, {
  'gulp/dist.js': [
    /const buildDir = 'build';/,
    /const allSrcGlob = 'src\/\*\*\/\*\.js';/,
  ],
  '!gulp/dist.js': [
    /import babel from 'gulp-babel';/,
    /\.pipe\(babel\(\)\)/,
  ],
  'gulp/lint.js': false,
  '.babelrc': false,
  '.eslintrc': false,
});
