import {testGenerator} from './helpers';

testGenerator('write-gulp-dist', {babel: 'es2015', linters: ['EsLint']}, {
  'gulp/dist.js': [
    /import babel from 'gulp-babel';/,
    /const libDir = 'lib';/,
    /const srcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /\.pipe\(babel\(\)\)/,
  ],
  'gulp/lint.js': true,
  '.babelrc': true,
  '.eslintrc': true,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/dist';/,
  ],
});

testGenerator('write-gulp-dist', {babel: 'es2015', linters: []}, {
  'gulp/dist.js': [
    /import babel from 'gulp-babel';/,
    /const libDir = 'lib';/,
    /const srcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /\.pipe\(babel\(\)\)/,
  ],
  'gulp/lint.js': false,
  '.babelrc': true,
  '.eslintrc': false,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/dist';/,
  ],
});

testGenerator('write-gulp-dist', {babel: 'none', linters: []}, {
  'gulp/dist.js': [
    /const libDir = 'lib';/,
    /const srcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
  ],
  '!gulp/dist.js': [
    /import babel from 'gulp-babel';/,
    /\.pipe\(babel\(\)\)/,
  ],
  'gulp/lint.js': false,
  '.babelrc': false,
  '.eslintrc': false,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/dist';/,
  ],
});

testGenerator('write-gulp-dist', {
  babel: 'none',
  linters: [],
  addons: ['React'],
}, {
  'gulp/dist.js': [
    /import babel from 'gulp-babel';/,
    /const libDir = 'lib';/,
    /const srcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /'src\/\*\*\/\*\.jsx'/,
    /\n    \.pipe\(babel\(\)\)/,
  ],
  'gulp/lint.js': false,
  '.babelrc': [
    /"presets": \["react"\]/,
    /"plugins": \["add-module-exports"\]/,
  ],
  '.eslintrc': false,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/dist';/,
  ],
});

testGenerator('write-gulp-dist', {
  babel: 'none',
  linters: [],
  addons: ['React'],
  preprocessors: ['Compass'],
}, {
  'gulp/dist.js': [
    /import babel from 'gulp-babel';/,
    /import compass from 'gulp-compass';/,
    /const libDir = 'lib';/,
    /const srcGlob = \[/,
    /'src\/\*\*\/\*\.js'/,
    /'src\/\*\*\/\*\.jsx'/,
    /\n    \.pipe\(babel\(\)\)/,
    /gulp\.task\('dist', gulp.parallel\(dist, distSass\)\);/,
  ],
  'gulp/lint.js': false,
  '.babelrc': [
    /"presets": \["react"\]/,
    /"plugins": \["add-module-exports"\]/,
  ],
  '.eslintrc': false,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/dist';/,
  ],
});
