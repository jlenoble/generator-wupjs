import Base from '../base';
import path from 'path';
import slug from 'slug';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'class',
    }, opts);

    super(args, options);

    this.promptIfMissing(['srcDir']);
  }

  initializing () {
    this.argument('className', {type: String, required: true});
  }

  writing () {
    const srcDir = this.get('srcDir');

    let filename = this.className[0].toLowerCase() +
      this.className.substring(1);
    filename = filename.replace(/[A-Z]/g, function (s) {
      return '-' + s;
    });
    filename = slug(filename, {lower: true}) + '.js';

    this.fs.copyTpl(
      this.templatePath('class.ejs'),
      this.destinationPath(path.join(srcDir, filename)),
      {Class: this.className}
    );
  }
}
