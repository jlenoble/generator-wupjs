import {testGenerator} from './helpers';

testGenerator('write-test-index', {addons: ['React']}, {
  'test/index.test.js': [
    /import '\.\/[0-9a-f]{40}\.test'/,
  ],
});

testGenerator('write-test-index', {addons: ['Enzyme']}, {
  'test/index.test.js': [
    /import '\.\/[0-9a-f]{40}\.test'/,
    /import chai from 'chai';/,
    /import chaiEnzyme from 'chai-enzyme';/,
    /chai.use\(chaiEnzyme\(\)\);/,
  ],
});
