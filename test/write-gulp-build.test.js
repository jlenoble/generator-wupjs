import {testGenerator} from './helpers';

testGenerator('write-gulp-build', {babel: ['env']}, {
  'gulp/build.js': [
    /import babel from 'gulp-babel';/,
    /const buildDir = 'build';/,
    /const allSrcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /'test\/\*\*\/\*\.js'/,
    /\.pipe\(babel\(\)\)/,
  ],
  'package.json': [
    /"gulp-babel": "\^\d+\.\d+\.\d+"/,
    /"gulp-sourcemaps": "\^\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/build';/,
  ],
});

testGenerator('write-gulp-build', {babel: []}, {
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
    /"gulp-sourcemaps": "\^\d+\.\d+\.\d+"/,
  ],
  '!package.json': [
    /"gulp-babel": "\^\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/build';/,
  ],
});

testGenerator('write-gulp-build', {
  babel: ['env'],
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
    /"gulp-babel": "\^\d+\.\d+\.\d+"/,
    /"gulp-sourcemaps": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/build';/,
  ],
});

testGenerator('write-gulp-build', {
  babel: [],
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
    /"gulp-babel": "\^\d+\.\d+\.\d+"/,
    /"gulp-sourcemaps": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
  'gulp/lint.js': false,
  '.babelrc': [
    /"presets": \[\s+"@babel\/preset-react"\s+\]/,
    /"plugins": \[\s+"add-module-exports"\s+\]/,
  ],
  '.eslintrc': false,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/build';/,
  ],
});
