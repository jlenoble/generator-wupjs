import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-serve',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'srcDir', 'buildDir']);
    this.addGulpIncludes(['serve']);
    this.addDevDeps({'browser-sync': '*'});
    this.composeWith('write-gulpfile');
  }

  writing () {
    const props = this.getProps();
    props.nodeDir = this.compute('nodeDir');
    props.staticDir = this.compute('staticDir');
    props.bsWatchGlob = this.compute('bsWatchGlob');

    this.fs.copyTpl(
      this.templatePath('serve.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'serve.js')),
      props
    );
  }
}
