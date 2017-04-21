import {testGenerator} from './helpers';

testGenerator('write-gulp-distclean', undefined, {
  '.yo-rc.json': [
    /"gulpIncludes": \[/,
    /  "distclean"/,
    /  "clean"/,
  ],
  'gulp/clean.js': [],
  'gulp/distclean.js': [
    /import '\.\/clean';/,
    /return del\('lib'\);/,
    /gulp\.task\('distclean', gulp\.parallel\('clean', distClean\)\);/,
  ],
  'package.json': [
    /"del": "\*"/,
  ],
});
