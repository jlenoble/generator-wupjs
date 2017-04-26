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
    /gulp\.task\('serve', gulp\.series\('bundle', serve\)\);/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/serve';/,
    /import '\.\/gulp\/bundle';/,
  ],
});

testGenerator('write-gulp-serve', {preprocessors: ['Compass']}, {
  'gulp/serve.js': [
    /import browserSync from 'browser-sync';/,
    /import '\.\/sass';/,
    /const buildDir = 'build';/,
    /const staticDir = 'src\/static';/,
    /const nodeDir = 'node_modules';/,
    /const bsWatchGlob = \[/,
    /  'src\/static\/index\.html'/,
    /  'build\/bundle\.js'/,
    /baseDir: \[buildDir, staticDir, nodeDir\],/,
    /gulp\.task\('serve', gulp.series\(gulp.parallel\('bundle', 'sass'\), serve\)\);/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/serve';/,
    /import '\.\/gulp\/bundle';/,
    /import '\.\/gulp\/sass';/,
  ],
});
