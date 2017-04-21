import {testGenerator} from './helpers';

testGenerator('write-gulp-test', undefined, {
  'gulp/test.js': [
    /import mocha from 'gulp-mocha';/,
    /const testGlob = 'build\/test\/\*\*\/\*\.test\.js';/,
    /\.pipe\(mocha\(\)\)/,
  ],
  'package.json': [
    /"gulp-mocha": "\*"/,
    /"chai": "\*"/,
  ],
});
