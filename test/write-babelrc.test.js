import {testGenerator} from './helpers';

testGenerator('write-babelrc', {babel: 'env'}, {
  '.yo-rc.json': [
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
  ],
  '.babelrc': [
    /"presets": \["env"\]/,
    /"plugins": \["add-module-exports"\]/,
  ],
});

testGenerator('write-babelrc', {babel: 'env', addons: ['React']}, {
  '.yo-rc.json': [
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
  '.babelrc': [
    /"presets": \["env", "react"\]/,
    /"plugins": \["add-module-exports"\]/,
  ],
});

testGenerator('write-babelrc', {babel: 'none'}, {
  '!.yo-rc.json': [
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
  ],
  '!package.json': [
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
  ],
  '.babelrc': false,
});
