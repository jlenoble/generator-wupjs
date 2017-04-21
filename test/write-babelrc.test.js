import {testGenerator} from './helpers';

testGenerator('write-babelrc', {babel: 'none'}, {
  '.yo-rc.json': [
    /"devDeps": \{\s*"babel-plugin-add-module-exports": "\*"\s*\}/,
  ],
  'package.json': [
    /"devDependencies": \{\s*"babel-plugin-add-module-exports":\s*"\*"\s*\}/,
  ],
  '.babelrc': [
    /"plugins": \["add-module-exports"\]/,
  ],
});
