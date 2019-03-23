import {testGenerator} from './helpers';

testGenerator('write-gulp-sass', {preprocessors: ['Compass']}, {
  'gulp/sass.js': [
    /import compass from 'gulp-compass';/,
    /const sassDir = 'src\/static\/scss';/,
    /const cssDir = 'build\/css';/,
    /const sassImportDir = 'node_modules';/,
    /const sassGlob = \[/,
    /  'src\/static\/scss\/\*\.scss'/,
  ],
  'package.json': [
    /"gulp-compass": "\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/sass';/,
  ],
});
