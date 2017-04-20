import Base from '../base';
import path from 'path';
import slug from 'slug';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'component',
    }, opts);

    super(args, options);

    this.promptIfMissing(['srcDir']);
  }

  initializing () {
    this.argument('componentName', {type: String, required: true});
  }

  writing () {
    const srcDir = this.get('srcDir');

    let filename = this.componentName[0].toLowerCase() +
      this.componentName.substring(1);
    filename = filename.replace(/[A-Z]/g, function (s) {
      return '-' + s;
    });
    filename = slug(filename, {lower: true}) + '.jsx';

    this.fs.copyTpl(
      this.templatePath('component.ejs'),
      this.destinationPath(path.join(srcDir, filename)),
      {Component: this.componentName}
    );
  }
}
