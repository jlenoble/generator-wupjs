import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-bundle',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'buildDir', 'addons']);
    this.addDevDeps({
      'browserify': '*',
      'vinyl-buffer': '*',
      'vinyl-source-stream': '*',
    });
    this.addGulpIncludes(['bundle']);
    this.composeWith('write-gulpfile');
  }

  writing () {
    const props = this.getProps();
    props.bundleRoot = this.compute('bundleRoot');
    props.bundleName = this.filenames('bundle');
    props.externalReact = this.compute('externalReact');

    this.fs.copyTpl(
      this.templatePath('bundle.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'bundle.js')),
      props
    );
  }
}
