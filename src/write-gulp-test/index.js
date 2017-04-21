import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-test',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'testDir', 'buildDir']);
    this.addDevDeps({
      'gulp-mocha': '*',
      'chai': '*',
    });
  }

  writing () {
    const props = this.getProps();
    props.testGlob = this.compute('testGlob');

    this.fs.copyTpl(
      this.templatePath('test.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'test.js')),
      props
    );
  }
}
