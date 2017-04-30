import {testGenerator} from './helpers';

testGenerator('class', {name: 'My Class'}, {
  'src/my-class.js': true,
  'test/my-class.test.js': true,
});

testGenerator('class', {name: 'My   Class'}, {
  'src/my-class.js': true,
  'test/my-class.test.js': true,
});

testGenerator('class', {name: 'MyClass'}, {
  'src/my-class.js': true,
  'test/my-class.test.js': true,
});

testGenerator('class MyClass', undefined, {
  'src/my-class.js': true,
  'test/my-class.test.js': true,
});
