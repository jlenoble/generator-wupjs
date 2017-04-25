import {testGenerator} from './helpers';

testGenerator('component', {name: 'Compo'}, {
  'src/compo.jsx': true,
  'test/compo.test.jsx': true,
});
