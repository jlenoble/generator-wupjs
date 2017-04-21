import {testGenerator} from './helpers';

testGenerator('write-gulpfile', undefined, {
  '.yo-rc.json': [
    /"gulp": "git:\/\/github\.com\/gulpjs\/gulp\.git#4\.0"/,
  ],
  'package.json': [
    /gulp":\s*"git:\/\/github\.com\/gulpjs\/gulp\.git#4\.0"/,
  ],
  'gulpfile.babel.js': true,
});
