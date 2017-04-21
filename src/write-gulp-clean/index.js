import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-clean',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'buildDir']);
  }

  writing () {
    const props = this.getProps();

    this.fs.copyTpl(
      this.templatePath('clean.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'clean.js')),
      props
    );
  }
}
