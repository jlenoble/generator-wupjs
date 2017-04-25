import {testGenerator} from './helpers';

testGenerator('component', {name: 'Compo'}, {
  'src/compo.jsx': true,
  'test/compo.test.jsx': true,
});

testGenerator('component', {name: 'Compo', addons: ['React']}, {
  'src/compo.jsx': [
    /import React, \{Component\} from 'react';/,
    /export default class Compo extends Component/,
  ],
  'test/compo.test.jsx': [
    /import TestUtils from 'react-dom\/test-utils';/,
    /import Compo from '\.\.\/src\/compo';/,
    /const component = TestUtils\.renderIntoDocument/,
  ],
});

testGenerator('component', {name: 'Compo', addons: ['Enzyme']}, {
  'src/compo.jsx': [
    /import React, \{Component\} from 'react';/,
    /export default class Compo extends Component/,
  ],
  'test/compo.test.jsx': [
    /import \{shallow\} from 'enzyme';/,
    /import Compo from '\.\.\/src\/compo';/,
    /const wrapper = shallow\(\s+<Compo\/>/,
  ],
});
