import {testGenerator} from './helpers';

testGenerator('write-gulp-tdd', undefined, {
  'gulp/tdd.js': true,
  "package.json": [
    /"plumb-gulp": "\*"/,
    /"autoreload-gulp": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/tdd';/,
  ],
});
