import {testGenerator} from './helpers';

testGenerator('preprocessors', {preprocessors: ['Compass']}, {
  '.yo-rc.json': [
    /"preprocessors"/,
    /"Compass"/,
    /"gulp-compass": "\*"/,
  ],
  'package.json': [
    /"gulp-compass": "\*"/,
  ],
});
