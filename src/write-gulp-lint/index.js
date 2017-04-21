import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-lint',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir']);
    this.addDevDeps({'gulp-eslint': '*'});
    this.addGulpIncludes(['lint']);
    this.composeWith('write-gulpfile');
  }

  writing () {
    const props = this.getProps();
    props.allSrcGlob = this.compute('allSrcGlob');

    this.fs.copyTpl(
      this.templatePath('lint.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'lint.js')),
      props
    );
  }
}
