import {testGenerator} from './helpers';

testGenerator('babel', {babel: 'es2017'}, {
  '.yo-rc.json': [
    /"babel": "es2017"/,
  ],
  'package.json': [
    /"babel-preset-es2015":\s*"\d+\.\d+\.\d+"/,
    /"babel-preset-es2016":\s*"\d+\.\d+\.\d+"/,
    /"babel-preset-es2017":\s*"\d+\.\d+\.\d+"/,
    /"gulp-babel":\s*"\d+\.\d+\.\d+"/,
  ],
  '.babelrc': [
    /"presets": \["es2015", "es2016", "es2017"\]/,
  ],
});

testGenerator('babel', {babel: 'none'}, {
  '!.yo-rc.json': [
    /"babel": "es2017"/,
  ],
  '!package.json': [
    /"babel-preset-es2015":\s*"\d+\.\d+\.\d+"/,
    /"babel-preset-es2016":\s*"\d+\.\d+\.\d+"/,
    /"babel-preset-es2017":\s*"\d+\.\d+\.\d+"/,
    /"gulp-babel":\s*"\d+\.\d+\.\d+"/,
  ],
  '.babelrc': false,
});
