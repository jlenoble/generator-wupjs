import {testGenerator} from './helpers';

testGenerator('deps', undefined, {
  '.yo-rc.json': [
    /"deps": \{\}/,
    /"devDeps": \{\}/,
    /"peerDeps": \{\}/,
  ],
  'package.json': [
    /"dependencies": \{\}/,
    /"devDependencies": \{\}/,
    /"peerDependencies": \{\}/,
  ],
});
