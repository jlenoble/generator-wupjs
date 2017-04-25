import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-test-bundle',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'buildDir', 'addons']);
    this.addDevDeps({
      'browserify': '*',
      'vinyl-buffer': '*',
      'vinyl-source-stream': '*',
    });
    this.addGulpIncludes(['test-bundle']);
    this.composeWith('write-gulpfile');
  }

  configuring () {
    if (this.has('React')) {
      this.addDevDeps({
        'mocha': '*',
      });
    }
  }

  writing () {
    const props = this.getProps();
    props.testBundleRoot = this.compute('testBundleRoot');
    props.testBundleName = this.compute('testBundleName');
    props.externalReact = this.compute('externalReact');

    this.fs.copyTpl(
      this.templatePath('test-bundle.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'test-bundle.js')),
      props
    );
  }
}
