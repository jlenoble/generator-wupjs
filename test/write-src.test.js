import {testGenerator} from './helpers';

testGenerator('write-src', {
  name: 'Test project',
}, {
  'src/test-project.js': true,
  'test/test-project.test.js': true,
  'src/test-project.jsx': false,
  'test/test-project.test.jsx': false,
});

testGenerator('write-src', {
  name: 'Test project',
  addons: ['React'],
}, {
  'src/test-project.js': false,
  'test/test-project.test.js': false,
  'src/test-project.jsx': true,
  'test/test-project.test.jsx': true,
});
