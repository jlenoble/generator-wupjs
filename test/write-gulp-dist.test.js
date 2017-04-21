import {testGenerator} from './helpers';

testGenerator('write-gulp-dist', {babel: 'es2015', linters: ['EsLint']}, {
  '.yo-rc.json': [
    /"gulpIncludes": \[/,
    /  "dist"/,
  ],
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
});

testGenerator('write-gulp-dist', {babel: 'es2015', linters: []}, {
  '.yo-rc.json': [
    /"gulpIncludes": \[/,
    /  "dist"/,
  ],
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
});

testGenerator('write-gulp-dist', {babel: 'none', linters: []}, {
  '.yo-rc.json': [
    /"gulpIncludes": \[/,
    /  "dist"/,
  ],
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
});
