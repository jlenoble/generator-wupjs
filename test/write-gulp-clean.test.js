import {testGenerator} from './helpers';

testGenerator('write-gulp-clean', undefined, {
  'gulp/clean.js': [
    /return del\('build'\);/,
    /gulp\.task\('clean', clean\);/,
  ],
  'package.json': [
    /"del": "\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/clean';/,
  ],
});
