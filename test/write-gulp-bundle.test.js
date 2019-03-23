import {testGenerator} from './helpers';

testGenerator('write-gulp-bundle', undefined, {
  'gulp/bundle.js': [
    /import browserify from 'browserify';/,
    /import buffer from 'vinyl-buffer';/,
    /import source from 'vinyl-source-stream';/,
    /const buildDir = 'build';/,
    /const bundleRoot = 'build\/src\/demo.js';/,
    /const bundleName = 'bundle.js';/,
  ],
  'package.json': [
    /"browserify": "\^\d+\.\d+\.\d+"/,
    /"vinyl-buffer": "\^\d+\.\d+\.\d+"/,
    /"vinyl-source-stream": "\^\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/bundle';/,
  ],
});

testGenerator('write-gulp-bundle', {addons: ['React']}, {
  'gulp/bundle.js': [
    /import browserify from 'browserify';/,
    /import buffer from 'vinyl-buffer';/,
    /import source from 'vinyl-source-stream';/,
    /const buildDir = 'build';/,
    /const bundleRoot = 'build\/src\/demo.js';/,
    /const bundleName = 'bundle.js';/,
    /    \.external\('react\/addons'\)/,
    /    \.external\('react\/lib\/ReactContext'\)/,
    /    \.external\('react\/lib\/ExecutionEnvironment'\)/,
  ],
  'package.json': [
    /"browserify": "\^\d+\.\d+\.\d+"/,
    /"vinyl-buffer": "\^\d+\.\d+\.\d+"/,
    /"vinyl-source-stream": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/bundle';/,
  ],
});
