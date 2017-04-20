import {testGenerator} from './helpers';

testGenerator('babel', {babel: 'es2017'}, {
  '.yo-rc.json': [
    /"babel": "es2017"/,
  ],
  'package.json': [
    /"babel-preset-es2015":\s*"\*"/,
    /"babel-preset-es2016":\s*"\*"/,
    /"babel-preset-es2017":\s*"\*"/,
    /"gulp-babel":\s*"\*"/,
  ],
  '.babelrc': [
    /"presets": \["es2015", "es2016", "es2017"\]/,
  ],
});
