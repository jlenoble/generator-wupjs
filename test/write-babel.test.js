import {testGenerator} from './helpers';

testGenerator('write-babel', undefined, {
  '.yo-rc.json': [
    /"devDeps": \{\s*"babel-plugin-add-module-exports": "\*"\s*\}/,
  ],
  'package.json': [
    /"devDependencies": \{\s*"babel-plugin-add-module-exports":\s*"\*"\s*\}/,
  ],
  '.babelrc': [
    /"plugins": \[\s+"add-module-exports"\s+\]/,
  ],
});
