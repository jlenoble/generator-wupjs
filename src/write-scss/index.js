import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-scss',
    }, opts);

    super(args, options);

    this.promptIfMissing(['preprocessors']);
  }

  writing () {
    const props = this.getProps();

    this.fs.copyTpl(
      this.templatePath('style.ejs'),
      this.destinationPath(path.join(this.dirs('sassDir'), 'style.scss')),
      props
    );
  }
}
