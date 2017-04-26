import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-tdd',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir']);
    this.addGulpIncludes(['tdd']);
    this.composeWith('write-gulp-test');
    this.composeWith('write-gulp-watch');
  }

  writing () {
    const props = this.getProps();

    this.fs.copyTpl(
      this.templatePath('tdd.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'tdd.js')),
      props
    );
  }
}
