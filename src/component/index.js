import Base from '../base';
import path from 'path';

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
    const filename = this.compute('componentFileName');

    this.fs.copyTpl(
      this.templatePath('component.ejs'),
      this.destinationPath(path.join(srcDir, filename)),
      {Component: this.componentName}
    );
  }
}
