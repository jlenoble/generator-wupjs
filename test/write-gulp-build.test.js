import {testGenerator} from './helpers';

testGenerator('write-gulp-build', {babel: 'es2015'}, {
  'gulp/build.js': [
    /import babel from 'gulp-babel';/,
    /const buildDir = 'build';/,
    /const allSrcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /'test\/\*\*\/\*\.js'/,
    /\.pipe\(babel\(\)\)/,
  ],
  'package.json': [
    /"gulp-babel": "\*"/,
    /"gulp-sourcemaps": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/build';/,
  ],
});

testGenerator('write-gulp-build', {babel: 'none'}, {
  'gulp/build.js': [
    /const buildDir = 'build';/,
    /const allSrcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /'test\/\*\*\/\*\.js'/,
  ],
  '!gulp/build.js': [
    /import babel from 'gulp-babel';/,
    /\.pipe\(babel\(\)\)/,
  ],
  'package.json': [
    /"gulp-sourcemaps": "\*"/,
  ],
  '!package.json': [
    /"gulp-babel": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/build';/,
  ],
});

testGenerator('write-gulp-build', {
  babel: 'es2015',
  addons: ['React'],
}, {
  'gulp/build.js': [
    /import babel from 'gulp-babel';/,
    /const buildDir = 'build';/,
    /const allSrcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /'src\/\*\*\/\*\.jsx'/,
    /'test\/\*\*\/\*\.js'/,
    /'test\/\*\*\/\*\.jsx'/,
    /\.pipe\(babel\(\)\)/,
  ],
  'package.json': [
    /"gulp-babel": "\*"/,
    /"gulp-sourcemaps": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
    /"react-addons-test-util": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/build';/,
  ],
});

testGenerator('write-gulp-build', {
  babel: 'none',
  linters: [],
  addons: ['React'],
}, {
  'gulp/build.js': [
    /import babel from 'gulp-babel';/,
    /const buildDir = 'build';/,
    /const allSrcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /'src\/\*\*\/\*\.jsx'/,
    /'test\/\*\*\/\*\.js'/,
    /'test\/\*\*\/\*\.jsx'/,
    /\n    \.pipe\(babel\(\)\)/,
  ],
  'package.json': [
    /"gulp-babel": "\*"/,
    /"gulp-sourcemaps": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
    /"react-addons-test-util": "\*"/,
  ],
  'gulp/lint.js': false,
  '.babelrc': [
    /"presets": \["react"\]/,
    /"plugins": \["add-module-exports"\]/,
  ],
  '.eslintrc': false,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/build';/,
  ],
});
