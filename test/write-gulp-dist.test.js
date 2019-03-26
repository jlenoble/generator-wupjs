import {testGenerator} from './helpers';

testGenerator('write-gulp-dist', {babel: ['env'], linters: ['EsLint']}, {
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

testGenerator('write-gulp-dist', {babel: ['env'], linters: []}, {
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

testGenerator('write-gulp-dist', {babel: [], linters: []}, {
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
  babel: [],
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
    /"presets": \["@babel\/preset-react"\]/,
    /"plugins": \["add-module-exports"\]/,
  ],
  '.eslintrc': false,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/dist';/,
  ],
});

testGenerator('write-gulp-dist', {
  babel: [],
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
    /return gulp\.src\(\[/,
    /  'src\/static\/scss\/\*\.scss'/,
    /css: 'lib',/,
    /sass: 'src\/static\/scss',/,
    /import_path: 'node_modules',/,
    /.pipe\(gulp\.dest\('lib'\)\);/,
    /gulp\.task\('dist', gulp.parallel\(dist, distSass\)\);/,
  ],
  'gulp/lint.js': false,
  '.babelrc': [
    /"presets": \["@babel\/preset-react"\]/,
    /"plugins": \["add-module-exports"\]/,
  ],
  '.eslintrc': false,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/dist';/,
  ],
});
