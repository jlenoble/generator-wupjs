import {testGenerator} from './helpers';

testGenerator('write-gulpfile', undefined, {
  '.yo-rc.json': [
    /"gulp": "\^\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /gulp":\s*"\^\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': true,
});
