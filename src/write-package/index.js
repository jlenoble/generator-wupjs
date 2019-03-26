import path from 'path';
import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['main', 'files'],
      generator: 'write-package',
    }, opts);

    super(args, options);

    this.composeWith('version');
    this.promptIfMissing(['name', 'description', 'author', 'email', 'github',
      'license', 'libDir', 'deps', 'devDeps', 'peerDeps',
      'contributors', 'keywords']);
  }

  configuring () {
    try {
      const {
        main, files,
        dependencies, devDependencies, peerDependencies,
      } = require(path.join(process.cwd(), 'package.json'));

      this.set({main, files});

      this.addDeps(dependencies);
      this.addDevDeps(devDependencies);
      this.addPeerDeps(peerDependencies);
    } catch (e) {}
  }

  writing () {
    const props = this.getProps();

    props.main = this.compute('main');
    props.files = this.compute('files');
    props.module = this.compute('module');
    props.nodeVersion = this.compute('nodeVersion');
    props.contributors = this.stringify(this.get('contributors'));
    props.keywords = this.stringify(this.get('keywords'));

    this.fs.copyTpl(
      this.templatePath('package.ejs'),
      this.destinationPath('package.json'),
      props
    );
  }
}
