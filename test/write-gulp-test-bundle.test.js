import {testGenerator} from './helpers';

testGenerator('write-gulp-test-bundle', undefined, {
  'gulp/test-bundle.js': [
    /import browserify from 'browserify';/,
    /import buffer from 'vinyl-buffer';/,
    /import source from 'vinyl-source-stream';/,
    /const buildDir = 'build';/,
    /const testBundleRoot = 'build\/test\/index.test.js';/,
    /const testBundleName = 'test-bundle.js';/,
  ],
  'package.json': [
    /"browserify": "\*"/,
    /"vinyl-buffer": "\*"/,
    /"vinyl-source-stream": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test-bundle';/,
  ],
});

testGenerator('write-gulp-test-bundle', {addons: ['React']}, {
  'gulp/test-bundle.js': [
    /import browserify from 'browserify';/,
    /import buffer from 'vinyl-buffer';/,
    /import source from 'vinyl-source-stream';/,
    /const buildDir = 'build';/,
    /const testBundleRoot = 'build\/test\/index.test.js';/,
    /const testBundleName = 'test-bundle.js';/,
    /    \.external\('react\/addons'\)/,
    /    \.external\('react\/lib\/ReactContext'\)/,
    /    \.external\('react\/lib\/ExecutionEnvironment'\)/,
  ],
  'package.json': [
    /"browserify": "\*"/,
    /"mocha": "\*"/,
    /"vinyl-buffer": "\*"/,
    /"vinyl-source-stream": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test-bundle';/,
  ],
});
