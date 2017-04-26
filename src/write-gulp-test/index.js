import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-test',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'testDir', 'buildDir', 'addons',
      'preprocessors']);
    this.addDevDeps({'chai': '*'});
    this.addGulpIncludes(['test']);
    this.composeWith('write-gulpfile');
  }

  configuring () {
    if (this.has('React')) {
      this.addDevDeps({
        'gulp-mocha-phantomjs': '*',
        'mocha': '*',
      });
    } else {
      this.addDevDeps({
        'gulp-mocha': '*',
      });
    }
  }

  writing () {
    const props = this.getProps();
    props.testGlob = this.compute('testGlob');
    props.gulpMocha = this.compute('gulpMocha');
    props.gulpMochaCallback = this.compute('gulpMochaCallback');
    props.onMochaEnd = this.compute('onMochaEnd');
    props.importPreTestTask = this.compute('importPreTestTask');
    props.preTestTask = this.compute('preTestTask');

    this.fs.copyTpl(
      this.templatePath('test.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'test.js')),
      props
    );
  }
}
