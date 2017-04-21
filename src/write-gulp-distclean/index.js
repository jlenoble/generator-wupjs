import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-distclean',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'buildDir', 'libDir']);
    this.composeWith('write-gulp-clean');
  }

  writing () {
    const props = this.getProps();

    this.fs.copyTpl(
      this.templatePath('distclean.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'distclean.js')),
      props
    );
  }
}
