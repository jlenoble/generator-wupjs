import {testGenerator} from './helpers';

testGenerator('write-gulp-clean', undefined, {
  '.yo-rc.json': [
    /"gulpIncludes": \[/,
    /  "clean"/,
  ],
  'gulp/clean.js': [
    /return del\('build'\);/,
    /gulp\.task\('clean', clean\);/,
  ],
  'package.json': [
    /"del": "\*"/,
  ],
});
