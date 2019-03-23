import {testGenerator} from './helpers';

testGenerator('write-gulp-tdd', undefined, {
  'gulp/tdd.js': true,
  "package.json": [
    /"plumb-gulp": "\^\d+\.\d+\.\d+"/,
    /"autoreload-gulp": "\^\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/tdd';/,
  ],
});
