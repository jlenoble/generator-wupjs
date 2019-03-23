import {testGenerator} from './helpers';

testGenerator('preprocessors', {preprocessors: ['Compass']}, {
  '.yo-rc.json': [
    /"preprocessors"/,
    /"Compass"/,
    /"gulp-compass": "\^\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /"gulp-compass": "\^\d+\.\d+\.\d+"/,
  ],
});
