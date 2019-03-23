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
    /"gulp-mocha": "\^\d+\.\d+\.\d+"/,
    /"chai": "\^\d+\.\d+\.\d+"/,
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
    /gulp\.task\('test', gulp.series\(gulp.parallel\('test-bundle', 'sass'\), test\)\);/,
  ],
  'package.json': [
    /"gulp-mocha-phantomjs": "\^\d+\.\d+\.\d+"/,
    /"chai": "\^\d+\.\d+\.\d+"/,
    /"mocha": "\^\d+\.\d+\.\d+"/,
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
    /"gulp-mocha-phantomjs": "\^\d+\.\d+\.\d+"/,
    /"chai": "\^\d+\.\d+\.\d+"/,
    /"mocha": "\^\d+\.\d+\.\d+"/,
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
    /"gulp-mocha-phantomjs": "\^\d+\.\d+\.\d+"/,
    /"chai": "\^\d+\.\d+\.\d+"/,
    /"mocha": "\^\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test';/,
  ],
});

testGenerator('write-gulp-test', {
  addons: ['ANTLR4'],
  grammar: 'Calc',
  listener: 'MyListener',
  rule: 'init',
}, {
  'gulp/test.js': [
    /import mocha from 'gulp-mocha';/,
    /import '\.\/parse'/,
    /gulp\.task\('test', gulp\.series\(gulp\.parallel\('parse', 'build'\), test\)\);/,
  ],
  'package.json': [
    /"gulp-mocha": "\^\d+\.\d+\.\d+"/,
    /"chai": "\^\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test';/,
  ],
});
