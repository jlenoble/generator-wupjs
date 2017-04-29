import Base from '../base';
import path from 'path';

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
    props.browserMocha = this._browserMocha();
    props.testBundleGlob = this._testBundleGlob();

    this.fs.copyTpl(
      this.templatePath('runner.ejs'),
      this.destinationPath(this.filepaths('runnerPage')),
      props
    );
  }

  _browserMocha () {
    return path.join(path.relative(this.get('buildDir'),
      this.dirs('nodeDir')), 'mocha/mocha.js');
  }

  _testBundleGlob () {
    return path.join(path.relative(this.get('testDir'),
      this.get('buildDir')), this.filenames('testBundle'));
  }
}
