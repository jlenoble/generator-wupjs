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
    props.allSassGlob = this.compute('allSassGlob');
    props.importBundles = this.compute('importBundles');
    props.importSassFromSass = this.compute('importSassFromSass');
    props.gulpWatchTest = this.compute('gulpWatchTest');
    props.gulpWatchSass = this.compute('gulpWatchSass');
    props.gulpWatchBundles = this.compute('gulpWatchBundles');

    this.fs.copyTpl(
      this.templatePath('watch.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'watch.js')),
      props
    );
  }
}
