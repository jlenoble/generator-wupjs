import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-test-html',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'testDir', 'addons']);
    this.addDevDeps({'mocha': '*'});
    this.composeWith('write-gulp-test-bundle');
  }

  writing () {
    const props = this.getProps();
    props.browserMocha = this.compute('browserMocha');
    props.testBundleName = this.compute('testBundleName');

    this.fs.copyTpl(
      this.templatePath('runner.ejs'),
      this.destinationPath(path.join(props.testDir, 'runner.html')),
      props
    );
  }
}
