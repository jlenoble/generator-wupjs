import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-package',
    }, opts);

    super(args, options);

    this.promptIfMissing(['name', 'description', 'author', 'email', 'github',
      'license', 'libDir', 'deps', 'devDeps', 'peerDeps', 'version',
      'contributors']);
  }

  writing () {
    const props = this.getProps();

    props.main = this.compute('main');
    props.module = this.compute('module');
    props.nodeVersion = this.compute('nodeVersion');
    props.contributors = this.stringify(this.get('contributors'));
    props.keywords = this.stringify([]);

    this.fs.copyTpl(
      this.templatePath('package.ejs'),
      this.destinationPath('package.json'),
      props
    );
  }
}
