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
  '!.yo-rc.json': [
    /"gulp-babel":/,
  ],
  'package.json': [
    /"gulp-eslint": "\*"/,
  ],
  '!package.json': [
    /"gulp-babel":/,
  ],
  '.eslintrc': [
    /"ecmaVersion": 5/,
  ],
});

testGenerator('write-eslintrc', {babel: 'es2016', linters: ['EsLint']}, {
  '.yo-rc.json': [
    /"gulp-eslint": "\*"/,
    /"gulp-babel": "\*"/,
  ],
  'package.json': [
    /"gulp-eslint": "\*"/,
    /"gulp-babel": "\*"/,
  ],
  '.eslintrc': [
    /"ecmaVersion": 2016/,
  ],
});

testGenerator('write-eslintrc', {
  babel: 'es2016',
  linters: ['EsLint'],
  addons: ['React'],
}, {
  '.yo-rc.json': [
    /"gulp-eslint": "\*"/,
    /"gulp-babel": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
    /"eslint-plugin-react": "\*"/,
  ],
  'package.json': [
    /"gulp-eslint": "\*"/,
    /"gulp-babel": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
    /"eslint-plugin-react": "\*"/,
  ],
  '.eslintrc': [
    /"ecmaVersion": 2016/,
    /"jsx": true/,
    /"plugins": \["react"\]/,
    /"react\/jsx-uses-react": \["error"\]/,
    /"react\/jsx-uses-vars": \["error"\]/,
  ],
});
