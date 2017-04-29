import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-test-html',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'testDir', 'buildDir', 'addons']);
    this.addDevDeps({'mocha': '*'});
    this.composeWith('write-gulp-test-bundle');
  }

  writing () {
    const props = this.getProps();
    props.browserMocha = this.compute('browserMocha');
    props.testBundleGlob = this.compute('testBundleGlob');

    this.fs.copyTpl(
      this.templatePath('runner.ejs'),
      this.destinationPath(this.filepaths('runnerPage')),
      props
    );
  }
}
