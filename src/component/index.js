import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'component',
    }, opts);

    super(args, options);

    this.promptIfMissing(['srcDir', 'testDir', 'name', 'addons']);
  }

  initializing () {
    this.argument('componentName', {type: String, required: false});
  }

  configuring () {
    if (!this.className) {
      this.className = this.compute('className');
    }
  }

  writing () {
    const props = this.getProps();

    const filename = this.compute('componentFileName');
    const testFilename = this.compute('componentTestFileName');

    props.Component = this.className;
    props.module = this.compute('module');
    props.componentTestText = this.compute('componentTestText');
    props.importComponentTestLib = this.compute('importComponentTestLib');

    this.fs.copyTpl(
      this.templatePath('component.ejs'),
      this.destinationPath(path.join(props.srcDir, filename)),
      props
    );

    this.fs.copyTpl(
      this.templatePath('component.test.ejs'),
      this.destinationPath(path.join(props.testDir, testFilename)),
      props
    );
  }
}
