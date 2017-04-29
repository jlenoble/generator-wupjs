import {testGenerator} from './helpers';

testGenerator('write-gulp-prepublish', undefined, {
  'gulp/prepublish.js': true,
  'gulpfile.babel.js': [
    /import '\.\/gulp\/prepublish';/,
  ],
});
