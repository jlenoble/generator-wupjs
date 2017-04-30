import {testGenerator} from './helpers';

testGenerator('gulpplugin MyPlugin', undefined, {
  'src/gulp-my-plugin.js': [
    /const PLUGIN_NAME = 'gulp-my-plugin';/,
  ],
  'test/gulp-my-plugin.test.js': [
    /import myPlugin from '\.\.\/src\/gulp-my-plugin\.js';/,
    /describe\('Testing Gulp plugin myPlugin'/,
    /it\(`Running gulpfile 'test\/gulpfiles\/gulpfile.babel.js'`/,
    /childProcess: \['gulp', \['--gulpfile', 'test\/gulpfiles\/gulpfile.babel.js'\]\],/,
  ],
  'test/gulpfiles/gulpfile.babel.js': [
    /import plugin from '\.\.\/\.\.\/src\/gulp-my-plugin\.js';/,
    /return gulp\.src\(\[\s+'test\/sources\/\*\*\/\*\.\*'\s+\]\)/,
  ],
  'package.json': [
    /"gulp-util": "\*"/,
    /"through2": "\*"/,
  ],
});
