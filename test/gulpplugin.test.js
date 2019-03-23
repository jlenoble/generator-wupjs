import {testGenerator} from './helpers';

testGenerator('gulpplugin MyPlugin', undefined, {
  'src/gulp-my-plugin.js': [
    /const PLUGIN_NAME = 'gulp-my-plugin';/,
  ],
  'test/gulp-my-plugin.test.js': [
    /describe\('Testing Gulp plugin myPlugin'/,
    /it\(`Running gulpfile 'test\/gulpfiles\/gulpfile.babel.js'`/,
    /childProcess: \['gulp', \['--gulpfile',\s+'test\/gulpfiles\/gulpfile.babel.js'\]\],/,
  ],
  'test/gulpfiles/gulpfile.babel.js': [
    /import myPlugin from '\.\.\/\.\.\/src\/gulp-my-plugin\.js';/,
    /return gulp\.src\(\[\s+'test\/sources\/\*\*\/\*\.\*'\s+\]\)/,
    /pipe\(myPlugin\(\)\)/,
  ],
  'package.json': [
    /"gulp-util": "\d+\.\d+\.\d+"/,
    /"through2": "\d+\.\d+\.\d+"/,
  ],
});
