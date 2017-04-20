import {testGenerator} from './helpers';

testGenerator('who', {
  author: 'Me Me',
  email: 'me@there',
}, {
  '.yo-rc.json': [
    /"author": "Me Me"/,
    /"email": "me@there"/,
  ],
  'LICENSE': [
    /Copyright \(c\) \d{4}(-\d{4})? Me Me <me@there>/,
  ],
  'package.json': [
    /"author": \{\s*"name": "Me Me",\s*"email": "me@there"\s*\}/,
  ],
});
