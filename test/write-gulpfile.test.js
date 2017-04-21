import {testGenerator} from './helpers';

testGenerator('write-gulpfile', undefined, {
  '.yo-rc.json': [
    /"devDeps": \{\s*"gulp": "git:\/\/github\.com\/gulpjs\/gulp\.git#4\.0"\s*\}/,
  ],
  'package.json': [
    /"devDependencies": \{\s*"gulp":\s*"git:\/\/github\.com\/gulpjs\/gulp\.git#4\.0"\s*\}/,
  ],
  'gulpfile.babel.js': [],
});
