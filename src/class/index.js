import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'class',
    }, opts);

    super(args, options);

    this.promptIfMissing(['srcDir', 'name']);
  }

  initializing () {
    this.argument('className', {type: String, required: false});
  }

  configuring () {
    if (!this.className) {
      this.className = this.compute('className');
    }
  }

  writing () {
    const srcDir = this.get('srcDir');
    const filename = this.compute('classFileName');

    this.fs.copyTpl(
      this.templatePath('class.ejs'),
      this.destinationPath(path.join(srcDir, filename)),
      {Class: this.className}
    );
  }
}
