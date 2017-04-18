import {testGenerator} from './helpers';

testGenerator('who', {
  author: 'Me Me',
  email: 'me@there',
}, [
  /"author": "Me Me"/,
  /"email": "me@there"/,
]);
