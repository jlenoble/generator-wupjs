import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    super(args, opts);

    this.promptIfMissing(['name', 'description', 'author', 'email', 'github',
      'license', 'libDir']);
  }

  writing () {
    const props = this.getProps();

    const module = props.name.replace(/\s+/g, '-').toLowerCase();
    props.main = path.join(props.libDir, module) + '.js';

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      props
    );
  }
}
