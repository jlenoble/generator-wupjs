import {testGenerator} from './helpers';

testGenerator('module', {
  name: 'my-module',
  description: 'Some description',
}, [
  /"name": "my-module"/,
  /"description": "Some description"/,
]);
