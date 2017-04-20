import {testGenerator} from './helpers';

testGenerator('date', undefined, {
  'LICENSE': [
    /Copyright \(c\) \d{4}(-\d{4})? \w+( \w+)* <(\w|\.|-|_|\d)+@(\w|\.|-|_|\d)+>/,
  ],
});
