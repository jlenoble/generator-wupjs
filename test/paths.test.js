import {testGenerator} from './helpers';

testGenerator('paths', {
  gulpDir: 'gulp',
  srcDir: 'src',
  testDir: 'test',
  buildDir: 'build',
  libDir: 'lib',
}, [
  /"gulpDir": "gulp"/,
  /"srcDir": "src"/,
  /"testDir": "test"/,
  /"buildDir": "build"/,
  /"libDir": "lib"/,
]);
