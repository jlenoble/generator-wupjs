import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-serve',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'srcDir', 'buildDir', 'preprocessors']);
    this.addGulpIncludes(['serve']);
    this.addDevDeps({'browser-sync': '*'});
    this.composeWith('write-gulp-bundle');
  }

  configuring () {
    if (this.has('Compass')) {
      this.composeWith('write-gulp-sass');
    }
  }

  writing () {
    const props = this.getProps();
    props.nodeDir = this.compute('nodeDir');
    props.staticDir = this.compute('staticDir');
    props.bsWatchGlob = this.compute('bsWatchGlob');
    props.importSass = this.compute('importSass');
    props.preServeTask = this.compute('preServeTask');

    this.fs.copyTpl(
      this.templatePath('serve.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'serve.js')),
      props
    );
  }
}
