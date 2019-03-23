import {testGenerator} from './helpers';

testGenerator('write-eslintrc', {babel: 'none', linters: []}, {
  '!.yo-rc.json': [
    /"gulp-eslint": "\d+\.\d+\.\d+"/,
  ],
  '!package.json': [
    /"gulp-eslint": "\d+\.\d+\.\d+"/,
  ],
  '.eslintrc': false,
});

testGenerator('write-eslintrc', {babel: 'none', linters: ['EsLint']}, {
  '.yo-rc.json': [
    /"gulp-eslint": "\d+\.\d+\.\d+"/,
  ],
  '!.yo-rc.json': [
    /"gulp-babel":/,
  ],
  'package.json': [
    /"gulp-eslint": "\d+\.\d+\.\d+"/,
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
    /"gulp-eslint": "\d+\.\d+\.\d+"/,
    /"gulp-babel": "\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /"gulp-eslint": "\d+\.\d+\.\d+"/,
    /"gulp-babel": "\d+\.\d+\.\d+"/,
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
    /"gulp-eslint": "\d+\.\d+\.\d+"/,
    /"gulp-babel": "\d+\.\d+\.\d+"/,
    /"react": "\d+\.\d+\.\d+"/,
    /"react-dom": "\d+\.\d+\.\d+"/,
    /"eslint-plugin-react": "\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /"gulp-eslint": "\d+\.\d+\.\d+"/,
    /"gulp-babel": "\d+\.\d+\.\d+"/,
    /"react": "\d+\.\d+\.\d+"/,
    /"react-dom": "\d+\.\d+\.\d+"/,
    /"eslint-plugin-react": "\d+\.\d+\.\d+"/,
  ],
  '.eslintrc': [
    /"ecmaVersion": 2016/,
    /"jsx": true/,
    /"plugins": \["react"\]/,
    /"react\/jsx-uses-react": \["error"\]/,
    /"react\/jsx-uses-vars": \["error"\]/,
  ],
});
