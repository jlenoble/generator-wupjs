import {testGenerator} from './helpers';

testGenerator('write-gulp-test-html', undefined, {
  'build/runner.html': [
    /<script src="\.\.\/node_modules\/mocha\/mocha\.js"><\/script>/,
    /mocha.setup\('bdd'\);/,
    /<script src="test-bundle\.js"><\/script>/,
  ],
  'package.json': [
    /"browserify": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/test-bundle';/,
  ],
});
