import {testGenerator} from './helpers';

testGenerator('write-gulp-watch', undefined, {
  'gulp/watch.js': [
    /import \{build\} from '\.\/build'/,
    /import \{test\} from '\.\/test'/,
    /const allSrcGlob = \[/,
    /  'src\/\*\*\/\*\.js'/,
    /  'test\/\*\*\/\*\.js'/,
    /const allBuildGlob = \[/,
    /  'build\/src\/\*\*\/\*\.js'/,
    /  'build\/test\/\*\*\/\*\.js'/,
    /gulp\.task\('watch', watch\);/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/watch';/,
  ],
});
