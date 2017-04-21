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
});
