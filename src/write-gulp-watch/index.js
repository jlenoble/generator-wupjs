import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-watch',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'addons', 'preprocessors']);
    this.addGulpIncludes(['watch']);
  }

  writing () {
    const props = this.getProps();
    props.allSrcGlob = this.compute('allSrcGlob');
    props.allBuildGlob = this.compute('allBuildGlob');
    props.importBundles = this.compute('importBundles');
    props.importSassFromSass = this.compute('importSassFromSass');
    props.gulpWatchTasks = this._gulpWatchTasks();

    this.fs.copyTpl(
      this.templatePath('watch.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'watch.js')),
      props
    );
  }

  _gulpWatchTasks () {
    let tasks = 'gulp.watch(allSrcGlob, build);\n';

    if (this.has('React') || this.has('Compass')) {
      tasks += 'gulp.watch(srcBuildGlob, bundle);\n';
      tasks += 'gulp.watch(allBuildGlob, testBundle);\n';
      tasks += 'gulp.watch(testBundleGlob, test);\n';
    } else {
      tasks += 'gulp.watch(allBuildGlob, test);\n';
    }

    if (this.has('Compass')) {
      tasks += 'gulp.watch(allSassGlob, sass);\n';
    }

    return tasks.replace(/\n/g, '\n  ');
  }
}
