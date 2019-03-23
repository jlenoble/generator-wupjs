import {testGenerator} from './helpers';

testGenerator('write-test-html', undefined, {
  'test/runner.html': [
    /<script src="\.\.\/node_modules\/mocha\/mocha\.js"><\/script>/,
    /mocha.setup\('bdd'\);/,
    /<script src="\.\.\/build\/test-bundle\.js"><\/script>/,
    /mocha.run\(\);/,
  ],
  'package.json': [
    /"browserify": "\d+\.\d+\.\d+"/,
    /"mocha": "\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test-bundle';/,
  ],
});

testGenerator('write-test-html', {addons: ['React']}, {
  'test/runner.html': [
    /<script src="\.\.\/node_modules\/mocha\/mocha\.js"><\/script>/,
    /mocha.setup\('bdd'\);/,
    /<script src="\.\.\/build\/test-bundle\.js"><\/script>/,
    /mocha.run\(\);/,
  ],
  'package.json': [
    /"browserify": "\d+\.\d+\.\d+"/,
    /"mocha": "\d+\.\d+\.\d+"/,
    /"react": "\d+\.\d+\.\d+"/,
    /"react-dom": "\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test-bundle';/,
  ],
});
