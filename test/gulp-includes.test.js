import {testGenerator} from './helpers';

testGenerator('gulp-includes', undefined, {
  '.yo-rc.json': [
    /"gulpIncludes": \[\]/,
  ],
});
