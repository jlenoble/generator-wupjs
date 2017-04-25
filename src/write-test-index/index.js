import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-test-index',
    }, opts);

    super(args, options);

    this.promptIfMissing(['testDir', 'addons']);
    this.composeWith('component');
  }

  configuring () {
    if (!this.className) {
      this.className = this.compute('className');
    }
  }

  writing () {
    const props = this.getProps();
    props.fileStem = this.compute('fileStem');

    this.fs.copyTpl(
      this.templatePath('index.test.ejs'),
      this.destinationPath(path.join(props.testDir, 'index.test.js')),
      props
    );
  }
}
