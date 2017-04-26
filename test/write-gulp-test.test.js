import {testGenerator} from './helpers';

testGenerator('write-gulp-test', undefined, {
  'gulp/test.js': [
    /import mocha from 'gulp-mocha';/,
    /import '\.\/build'/,
    /const testGlob = \[/,
    /'build\/test\/\*\*\/\*\.test\.js'/,
    /\.pipe\(mocha\(\)\)/,
    /gulp\.task\('test', gulp.series\('build', test\)\);/,
  ],
  'package.json': [
    /"gulp-mocha": "\*"/,
    /"chai": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test';/,
  ],
});

testGenerator('write-gulp-test', {preprocessors: ['Compass']}, {
  'gulp/test.js': [
    /import mocha from 'gulp-mocha-phantomjs';/,
    /import '\.\/sass'/,
    /const testGlob = 'test\/runner.html'/,
    /\.pipe\(mocha\(\)\)/,
    /\.on\('end', done\)/,
    /gulp\.task\('test', gulp.series\(gulp.parallel\('build', 'sass'\), test\)\);/,
  ],
  'package.json': [
    /"gulp-mocha-phantomjs": "\*"/,
    /"chai": "\*"/,
    /"mocha": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test';/,
  ],
});

testGenerator('write-gulp-test', {addons: ['React']}, {
  'gulp/test.js': [
    /import mocha from 'gulp-mocha-phantomjs';/,
    /import '\.\/test-bundle'/,
    /const testGlob = 'test\/runner.html'/,
    /\.pipe\(mocha\(\)\)/,
    /\.on\('end', done\)/,
    /gulp\.task\('test', gulp.series\('test-bundle', test\)\);/,
  ],
  'package.json': [
    /"gulp-mocha-phantomjs": "\*"/,
    /"chai": "\*"/,
    /"mocha": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test';/,
  ],
});

testGenerator('write-gulp-test', {
  addons: ['React'],
  preprocessors: ['Compass'],
}, {
  'gulp/test.js': [
    /import mocha from 'gulp-mocha-phantomjs';/,
    /import '\.\/sass'/,
    /const testGlob = 'test\/runner.html'/,
    /\.pipe\(mocha\(\)\)/,
    /\.on\('end', done\)/,
    /gulp\.task\('test', gulp\.series\(gulp\.parallel\('test-bundle', 'sass'\), test\)\);/,
  ],
  'package.json': [
    /"gulp-mocha-phantomjs": "\*"/,
    /"chai": "\*"/,
    /"mocha": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test';/,
  ],
});
