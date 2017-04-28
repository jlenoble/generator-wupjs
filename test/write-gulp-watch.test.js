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
    /gulp\.watch\(allSrcGlob, build\);/,
    /gulp\.watch\(allBuildGlob, test\);/,
    /gulp\.task\('watch', watch\);/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/watch';/,
  ],
});

testGenerator('write-gulp-watch', {addons: ['React']}, {
  'gulp/watch.js': [
    /import \{build\} from '\.\/build'/,
    /import \{bundle\} from '\.\/bundle'/,
    /import \{testBundle\} from '\.\/test-bundle'/,
    /import \{test\} from '\.\/test'/,
    /const testBundleGlob = 'build\/test-bundle.js'/,
    /const allSrcGlob = \[/,
    /  'src\/\*\*\/\*\.js'/,
    /  'src\/\*\*\/\*\.jsx'/,
    /  'test\/\*\*\/\*\.js'/,
    /  'test\/\*\*\/\*\.jsx'/,
    /const allBuildGlob = \[/,
    /  'build\/src\/\*\*\/\*\.js'/,
    /  'build\/test\/\*\*\/\*\.js'/,
    /gulp\.watch\(allSrcGlob, build\);/,
    /gulp\.watch\(srcBuildGlob, bundle\);/,
    /gulp\.watch\(allBuildGlob, testBundle\);/,
    /gulp\.watch\(testBundleGlob, test\)/,
    /gulp\.task\('watch', watch\);/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/watch';/,
  ],
});

testGenerator('write-gulp-watch', {
  addons: ['React'],
  preprocessors: ['Compass'],
}, {
  'gulp/watch.js': [
    /import \{build\} from '\.\/build'/,
    /import \{bundle\} from '\.\/bundle'/,
    /import \{testBundle\} from '\.\/test-bundle'/,
    /import \{test\} from '\.\/test'/,
    /import \{sass\} from '\.\/sass'/,
    /const testBundleGlob = 'build\/test-bundle.js'/,
    /const allSrcGlob = \[/,
    /  'src\/\*\*\/\*\.js'/,
    /  'src\/\*\*\/\*\.jsx'/,
    /  'test\/\*\*\/\*\.js'/,
    /  'test\/\*\*\/\*\.jsx'/,
    /const allBuildGlob = \[/,
    /  'build\/src\/\*\*\/\*\.js'/,
    /  'build\/test\/\*\*\/\*\.js'/,
    /const allSassGlob = \[/,
    /  'src\/static\/scss\/\*\*\/\*\.scss'/,
    /gulp\.watch\(allSrcGlob, build\);/,
    /gulp\.watch\(srcBuildGlob, bundle\);/,
    /gulp\.watch\(allBuildGlob, testBundle\);/,
    /gulp\.watch\(testBundleGlob, test\)/,
    /gulp\.watch\(allSassGlob, sass\)/,
    /gulp\.task\('watch', watch\);/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/watch';/,
  ],
});
