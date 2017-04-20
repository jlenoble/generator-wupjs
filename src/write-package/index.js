import Base from '../base';
import path from 'path';
import stringify from 'json-stable-stringify';

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

    props.deps = stringify(props.deps, {space: 2})
      .replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');
    props.devDeps = stringify(props.devDeps, {space: 2})
      .replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');
    props.peerDeps = stringify(props.peerDeps, {space: 2})
      .replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');

    this.fs.copyTpl(
      this.templatePath('package.ejs'),
      this.destinationPath('package.json'),
      props
    );
  }
}
