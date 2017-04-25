import {testGenerator} from './helpers';

testGenerator('write-test-index', {addons: ['React']}, {
  'test/index.test.js': [
    /import '\.\/[0-9a-f]{40}\.test'/,
  ],
});
