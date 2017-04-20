import {testGenerator} from './helpers';

testGenerator('babel', {babel: 'es2017'}, {
  '.yo-rc.json': [
    /"babel": "es2017"/,
  ],
  'package.json': [],
  '.babelrc': [
    /"presets": \["es2015", "es2016", "es2017"\]/,
  ],
});
