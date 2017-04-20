import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-package',
    }, opts);

    super(args, options);

    this.promptIfMissing(['name', 'description', 'author', 'email', 'github',
      'license', 'libDir', 'deps', 'devDeps', 'peerDeps']);
  }

  writing () {
    const props = this.getProps();

    const module = props.name.replace(/\s+/g, '-').toLowerCase();
    props.main = path.join(props.libDir, module) + '.js';

    props.deps = JSON.stringify(props.deps);
    props.devDeps = JSON.stringify(props.devDeps);
    props.peerDeps = JSON.stringify(props.peerDeps);

    this.fs.copyTpl(
      this.templatePath('package.ejs'),
      this.destinationPath('package.json'),
      props
    );
  }
}
