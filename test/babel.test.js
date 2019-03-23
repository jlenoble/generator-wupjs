import {testGenerator} from './helpers';

testGenerator('babel', {babel: 'env'}, {
  '.yo-rc.json': [
    /"babel": "env"/,
  ],
  'package.json': [
    /"babel-preset-env":\s*"\^\d+\.\d+\.\d+"/,
    /"gulp-babel":\s*"\^\d+\.\d+\.\d+"/,
  ],
  '.babelrc': [
    /"presets": \["env"\]/,
  ],
});

testGenerator('babel', {babel: 'none'}, {
  '!.yo-rc.json': [
    /"babel": "env"/,
  ],
  '!package.json': [
    /"babel-preset-env":\s*"\^\d+\.\d+\.\d+"/,
    /"gulp-babel":\s*"\^\d+\.\d+\.\d+"/,
  ],
  '.babelrc': false,
});
