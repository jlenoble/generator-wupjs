import {testGenerator} from './helpers';

testGenerator('babel', {babel: ['env']}, {
  '.yo-rc.json': [
    /"babel": \[\s*"env"\s*\]/,
  ],
  'package.json': [
    /"@babel\/core":\s*"\^\d+\.\d+\.\d+"/,
    /"@babel\/preset-env":\s*"\^\d+\.\d+\.\d+"/,
    /"@babel\/register":\s*"\^\d+\.\d+\.\d+"/,
    /"gulp-babel":\s*"\^\d+\.\d+\.\d+"/,
  ],
  '.babelrc': [
    /"presets": \[\s+\["@babel\/preset-env", \{\s+"targets": \{\s+"node": "current"\s+\}\s+\}\]\s+\]/,
  ],
});

testGenerator('babel', {babel: []}, {
  '!.yo-rc.json': [
    /"babel": \[\s*"env"\s*\]/,
  ],
  '!package.json': [
    /"@babel\/core":\s*"\^\d+\.\d+\.\d+"/,
    /"@babel\/preset-env":\s*"\^\d+\.\d+\.\d+"/,
    /"@babel\/register":\s*"\^\d+\.\d+\.\d+"/,
    /"gulp-babel":\s*"\^\d+\.\d+\.\d+"/,
  ],
  '.babelrc': false,
});
