import {testGenerator} from './helpers';

testGenerator('class', {name: 'Compo'}, {
  'src/compo.js': true,
  'test/compo.test.js': true,
});
