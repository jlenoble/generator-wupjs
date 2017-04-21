import {testGenerator} from './helpers';

testGenerator('write-babelrc', {babel: 'es2016'}, {
  '.yo-rc.json': [
    /"babel-plugin-add-module-exports": "\*"/,
  ],
  'package.json': [
    /"babel-plugin-add-module-exports": "\*"/,
  ],
  '.babelrc': [
    /"plugins": \["add-module-exports"\]/,
  ],
});

testGenerator('write-babelrc', {babel: 'none'}, {
  '!.yo-rc.json': [
    /"babel-plugin-add-module-exports": "\*"/,
  ],
  '!package.json': [
    /"babel-plugin-add-module-exports": "\*"/,
  ],
  '.babelrc': false,
});
