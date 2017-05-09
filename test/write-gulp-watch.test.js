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
  '!gulp/watch.js': [
    /'src\/\*\*\/\*\.jsx'/,
    /'test\/\*\*\/\*\.jsx'/,
    /'build\/src\/\*\*\/\*\.jsx'/,
    /'build\/test\/\*\*\/\*\.jsx'/,
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
    /const srcBuildGlob = \[/,
    /gulp\.watch\(allSrcGlob, build\);/,
    /gulp\.watch\(srcBuildGlob, bundle\);/,
    /gulp\.watch\(allBuildGlob, testBundle\);/,
    /gulp\.watch\(testBundleGlob, test\)/,
    /gulp\.task\('watch', watch\);/,
  ],
  '!gulp/watch.js': [
    /import \{sass\} from '\.\/sass'/,
    /'build\/src\/\*\*\/\*\.jsx'/,
    /'build\/test\/\*\*\/\*\.jsx'/,
    /const allSassGlob = \[/,
    /'src\/static\/scss\/\*\*\/\*\.scss'/,
    /gulp\.watch\(allSassGlob, sass\)/,
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
    /const srcBuildGlob = \[/,
    /const allSassGlob = \[/,
    /  'src\/static\/scss\/\*\*\/\*\.scss'/,
    /gulp\.watch\(allSrcGlob, build\);/,
    /gulp\.watch\(srcBuildGlob, bundle\);/,
    /gulp\.watch\(allBuildGlob, testBundle\);/,
    /gulp\.watch\(testBundleGlob, test\)/,
    /gulp\.watch\(allSassGlob, sass\)/,
    /gulp\.task\('watch', watch\);/,
  ],
  '!gulp/watch.js': [
    /'build\/src\/\*\*\/\*\.jsx'/,
    /'build\/test\/\*\*\/\*\.jsx'/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/watch';/,
  ],
});

testGenerator('write-gulp-watch', {
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
    /  'test\/\*\*\/\*\.js'/,
    /const allBuildGlob = \[/,
    /  'build\/src\/\*\*\/\*\.js'/,
    /  'build\/test\/\*\*\/\*\.js'/,
    /const srcBuildGlob = \[/,
    /const allSassGlob = \[/,
    /  'src\/static\/scss\/\*\*\/\*\.scss'/,
    /gulp\.watch\(allSrcGlob, build\);/,
    /gulp\.watch\(srcBuildGlob, bundle\);/,
    /gulp\.watch\(allBuildGlob, testBundle\);/,
    /gulp\.watch\(testBundleGlob, test\)/,
    /gulp\.watch\(allSassGlob, sass\)/,
    /gulp\.task\('watch', watch\);/,
  ],
  '!gulp/watch.js': [
    /'src\/\*\*\/\*\.jsx'/,
    /'test\/\*\*\/\*\.jsx'/,
    /'build\/src\/\*\*\/\*\.jsx'/,
    /'build\/test\/\*\*\/\*\.jsx'/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/watch';/,
  ],
});

testGenerator('write-gulp-watch', {
  addons: ['ANTLR4'],
  grammar: 'Calc',
  listener: 'MyListener',
  rule: 'init',
}, {
  'gulp/watch.js': [
    /import \{build\} from '\.\/build'/,
    /import \{makeParser, parse\} from '\.\/parse'/,
    /import \{test\} from '\.\/test'/,
    /const allSrcGlob = \[/,
    /  'src\/\*\*\/\*\.js'/,
    /  'test\/\*\*\/\*\.js'/,
    /  '!src\/static\/antlr4\/parsers\/\*\*\/\*\.js'/,
    /const allBuildGlob = \[/,
    /  'build\/src\/\*\*\/\*\.js'/,
    /  'build\/test\/\*\*\/\*\.js'/,
    /const grammarGlob = \[/,
    /  'src\/static\/antlr4\/grammars\/\*\*\/\*\.g4'/,
    /const dataGlob = \[/,
    /  'src\/static\/data\/\*\*\/\*\.\*'/,
    /  'src\/static\/antlr4\/parsers\/CalcParser.js'/,
    /gulp\.watch\(allSrcGlob, build\);/,
    /gulp\.watch\(grammarGlob, makeParser\)/,
    /gulp\.watch\(dataGlob, parse\)/,
    /gulp\.task\('watch', watch\);/,
  ],
  '!gulp/watch.js': [
    /'src\/\*\*\/\*\.jsx'/,
    /'test\/\*\*\/\*\.jsx'/,
    /'build\/src\/\*\*\/\*\.jsx'/,
    /'build\/test\/\*\*\/\*\.jsx'/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/watch';/,
  ],
});
