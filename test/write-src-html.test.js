import {testGenerator} from './helpers';

testGenerator('write-src-html', undefined, {
  'src/static/index.html': [
    /<script src="bundle\.js"><\/script>/,
  ],
  'package.json': [
    /"browserify": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/bundle';/,
  ],
});

testGenerator('write-src-html', {addons: ['React']}, {
  'src/static/index.html': [
    /<script src="bundle\.js"><\/script>/,
  ],
  'package.json': [
    /"browserify": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/bundle';/,
  ],
});
