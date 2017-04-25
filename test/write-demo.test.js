import {testGenerator} from './helpers';

testGenerator('write-demo', {addons: ['React'], name: 'Compo'}, {
  'src/demo.js': [
    /import React from 'react';/,
    /import \{render\} from 'react-dom';/,
    /import Compo from '\.\/compo'/,
    /render\(<Compo\/>, document\.getElementById\('app'\)\);/,
  ],
});
