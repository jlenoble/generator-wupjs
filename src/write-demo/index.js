import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-demo',
    }, opts);

    super(args, options);

    this.promptIfMissing(['srcDir', 'preprocessors', 'addons', 'name']);
  }

  configuring () {
    if (!this.className) {
      this.className = this.compute('className');
    }
  }

  writing () {
    const props = this.getProps();
    props.Component = this.compute('className');
    props.module = this.compute('module');

    this.fs.copyTpl(
      this.templatePath('demo.ejs'),
      this.destinationPath(path.join(this.get('srcDir'), 'demo.js')),
      props
    );
  }
}
