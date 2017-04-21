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
  '!package.json': [
    /"gulp-babel": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/build';/,
  ],
});
