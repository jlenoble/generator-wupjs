import {testGenerator} from './helpers';

testGenerator('write-gulp-distclean', undefined, {
  'gulp/clean.js': [],
  'gulp/distclean.js': [
    /import '\.\/clean';/,
    /return del\('lib'\);/,
    /gulp\.task\('distclean', gulp\.parallel\('clean', distClean\)\);/,
  ],
  'package.json': [
    /"del": "\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/distclean';/,
  ],
});
