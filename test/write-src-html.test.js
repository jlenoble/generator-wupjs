import {testGenerator} from './helpers';

testGenerator('write-src-html', undefined, {
  'src/static/index.html': [
    /<script src="bundle\.js"><\/script>/,
  ],
  'package.json': [
    /"browserify": "\d+\.\d+\.\d+"/,
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
    /"browserify": "\d+\.\d+\.\d+"/,
    /"react": "\d+\.\d+\.\d+"/,
    /"react-dom": "\d+\.\d+\.\d+"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/bundle';/,
  ],
});
