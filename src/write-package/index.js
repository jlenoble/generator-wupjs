import Base from '../base';

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

    props.main = this.compute('main');
    props.dependencies = this.compute('dependencies');
    props.devDependencies = this.compute('devDependencies');
    props.peerDependencies = this.compute('peerDependencies');

    this.fs.copyTpl(
      this.templatePath('package.ejs'),
      this.destinationPath('package.json'),
      props
    );
  }
}
