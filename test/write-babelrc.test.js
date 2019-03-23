import {testGenerator} from './helpers';

testGenerator('write-babelrc', {babel: 'es2016'}, {
  '.yo-rc.json': [
    /"babel-plugin-add-module-exports": "\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /"babel-plugin-add-module-exports": "\d+\.\d+\.\d+"/,
  ],
  '.babelrc': [
    /"plugins": \["add-module-exports"\]/,
  ],
});

testGenerator('write-babelrc', {babel: 'es2016', addons: ['React']}, {
  '.yo-rc.json': [
    /"babel-plugin-add-module-exports": "\d+\.\d+\.\d+"/,
    /"react": "\d+\.\d+\.\d+"/,
    /"react-dom": "\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /"babel-plugin-add-module-exports": "\d+\.\d+\.\d+"/,
    /"react": "\d+\.\d+\.\d+"/,
    /"react-dom": "\d+\.\d+\.\d+"/,
  ],
  '.babelrc': [
    /"presets": \["es2015", "es2016", "react"\]/,
    /"plugins": \["add-module-exports"\]/,
  ],
});

testGenerator('write-babelrc', {babel: 'none'}, {
  '!.yo-rc.json': [
    /"babel-plugin-add-module-exports": "\d+\.\d+\.\d+"/,
  ],
  '!package.json': [
    /"babel-plugin-add-module-exports": "\d+\.\d+\.\d+"/,
  ],
  '.babelrc': false,
});
