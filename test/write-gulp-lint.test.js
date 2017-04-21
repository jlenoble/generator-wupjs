import {testGenerator} from './helpers';

testGenerator('write-gulp-lint', undefined, {
  'gulp/lint.js': [
    /import eslint from 'gulp-eslint';/,
    /const allSrcGlob = 'src\/\*\*\/\*\.js';/,
    /\.pipe\(eslint\(\)\)/,
    /\.pipe\(eslint\.format\(\)\)/,
  ],
  'package.json': [
    /"gulp-eslint": "\*"/,
  ],
});
