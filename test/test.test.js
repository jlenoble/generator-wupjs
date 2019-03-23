import {testGenerator} from './helpers';

testGenerator('test', {testRunners: ['Mocha']}, {
  '.yo-rc.json': [
    /"testRunners"/,
    /"Mocha"/,
  ],
  'package.json': [
    /"gulp-mocha": "\d+\.\d+\.\d+"/,
    /"chai": "\d+\.\d+\.\d+"/,
  ],
  'gulp/test.js': [
    /import mocha from 'gulp-mocha';/,
  ],
});

testGenerator('test', {testRunners: []}, {
  '.yo-rc.json': [
    /"testRunners": \[\]/,
  ],
  '!.yo-rc.json': [
    /"Mocha"/,
  ],
  '!package.json': [
    /"gulp-mocha":/,
    /"chai":/,
  ],
  'gulp/test.js': false,
});
