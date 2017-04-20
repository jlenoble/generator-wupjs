import {testGenerator} from './helpers';

testGenerator('module', {
  name: 'my-module',
  description: 'Some description',
}, {
  '.yo-rc.json': [
    /"name": "my-module"/,
    /"description": "Some description"/,
  ],
  'package.json': [
    /"name": "my-module"/,
    /"description": "Some description"/,
  ],
});
