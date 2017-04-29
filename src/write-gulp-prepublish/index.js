import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-prepublish',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir']);
    this.addGulpIncludes(['prepublish']);
    this.composeWith('write-gulp-test');
    this.composeWith('write-gulp-dist');
    this.composeWith('write-gulp-doc');
    this.composeWith('write-gulp-distclean');
    this.composeWith('write-gulpfile');
  }

  writing () {
    const props = this.getProps();

    this.fs.copyTpl(
      this.templatePath('prepublish.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'prepublish.js')),
      props
    );
  }
}
