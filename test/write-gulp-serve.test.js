import {testGenerator} from './helpers';

testGenerator('write-gulp-serve', {}, {
  'gulp/serve.js': [
    /import browserSync from 'browser-sync';/,
    /const buildDir = 'build';/,
    /const staticDir = 'src\/static';/,
    /const nodeDir = 'node_modules';/,
    /const bsWatchGlob = \[/,
    /  'src\/static\/index\.html'/,
    /  'build\/bundle\.js'/,
    /baseDir: \[buildDir, staticDir, nodeDir\],/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/serve';/,
  ],
});
