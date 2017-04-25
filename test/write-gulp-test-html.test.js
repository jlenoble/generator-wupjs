import {testGenerator} from './helpers';

testGenerator('write-gulp-test-html', undefined, {
  'test/runner.html': [
    /<script src="\.\.\/node_modules\/mocha\/mocha\.js"><\/script>/,
    /mocha.setup\('bdd'\);/,
    /<script src="\.\.\/test\/test-bundle\.js"><\/script>/,
    /mocha.run\(\);/,
  ],
  'package.json': [
    /"browserify": "\*"/,
    /"mocha": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test-bundle';/,
  ],
});

testGenerator('write-gulp-test-html', {addons: ['React']}, {
  'test/runner.html': [
    /<script src="\.\.\/node_modules\/mocha\/mocha\.js"><\/script>/,
    /mocha.setup\('bdd'\);/,
    /<script src="\.\.\/test\/test-bundle\.js"><\/script>/,
    /mocha.run\(\);/,
  ],
  'package.json': [
    /"browserify": "\*"/,
    /"mocha": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test-bundle';/,
  ],
});
