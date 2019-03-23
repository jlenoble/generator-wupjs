import {testGenerator} from './helpers';

testGenerator('lint', {babel: 'none', linters: ['EsLint']}, {
  '.yo-rc.json': [
    /"linters"/,
    /"EsLint"/,
  ],
  'package.json': [
    /"gulp-eslint": "\^\d+\.\d+\.\d+"/,
    /"eslint-config-google": "\^\d+\.\d+\.\d+"/,
  ],
  'gulp/lint.js': [
    /import eslint from 'gulp-eslint';/,
  ],
});

testGenerator('lint', {babel: 'none', linters: []}, {
  '.yo-rc.json': [
    /"linters": \[\]/,
  ],
  '!.yo-rc.json': [
    /"EsLint"/,
  ],
  '!package.json': [
    /"gulp-eslint":/,
    /"eslint-config-google":/,
  ],
  'gulp/lint.js': false,
});
