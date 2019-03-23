import {testGenerator} from './helpers';

testGenerator('app', {
  name: 'some-module',
  babel: 'env',
  linters: ['EsLint'],
  testRunners: ['Mocha'],
}, {
  '.yo-rc.json': true,
  'package.json': true,
  '.babelrc': true,
  '.eslintrc': true,
  'LICENSE': true,
  'gulpfile.babel.js': true,
  'src/some-module.js': true,
  'test/some-module.test.js': true,
  'gulp/build.js': true,
  'gulp/dist.js': true,
  'gulp/clean.js': true,
  'gulp/distclean.js': true,
  'gulp/lint.js': true,
  'gulp/test.js': true,
});
