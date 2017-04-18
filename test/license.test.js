import {testGenerator} from './helpers';

testGenerator('license', {
  license: 'GPL-3.0',
  author: 'Me Me',
  email: 'me@there',
}, [
  /"license": "GPL-3.0"/,
  /"author": "Me Me"/,
  /"email": "me@there"/,
]);
