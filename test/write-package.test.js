import {testGenerator} from './helpers';

testGenerator('write-package', undefined, {
  '.yo-rc.json': [],
  'package.json': [
    /"version": "0.0.0"/,
    /"contributors": \[\]/,
    /"keywords": \[\]/,
    /"node": ">=\d+\.\d+\.\d+"/,
  ],
});
