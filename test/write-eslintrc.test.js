import {testGenerator} from './helpers';

testGenerator('write-eslintrc', {babel: 'none', linters: []}, {
  '!.yo-rc.json': [
    /"gulp-eslint": "\*"/,
  ],
  '!package.json': [
    /"gulp-eslint": "\*"/,
  ],
  '.eslintrc': false,
});

testGenerator('write-eslintrc', {babel: 'none', linters: ['EsLint']}, {
  '.yo-rc.json': [
    /"gulp-eslint": "\*"/,
  ],
  'package.json': [
    /"gulp-eslint": "\*"/,
  ],
  '.eslintrc': [],
});
