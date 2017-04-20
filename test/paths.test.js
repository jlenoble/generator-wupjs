import {testGenerator} from './helpers';

testGenerator('paths', {
  gulpDir: 'gulp',
  srcDir: 'src',
  testDir: 'test',
  buildDir: 'build',
  libDir: 'deploy',
}, {
  '.yo-rc.json': [
    /"gulpDir": "gulp"/,
    /"srcDir": "src"/,
    /"testDir": "test"/,
    /"buildDir": "build"/,
    /"libDir": "deploy"/,
  ],
  'package.json': [
    /"main": "deploy\/[0-9a-f]{40}\.js"/,
  ],
});
