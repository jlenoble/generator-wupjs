import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-dist',
    }, opts);

    super(args, options);

    this.promptIfMissing(['babel', 'gulpDir', 'buildDir', 'srcDir', 'linters']);
    this.addGulpIncludes(['dist']);
    this.composeWith('write-gulpfile');
  }

  writing () {
    const props = this.getProps();
    props.allSrcGlob = this.compute('allSrcGlob');

    this.fs.copyTpl(
      this.templatePath('dist.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'dist.js')),
      props
    );
  }
}
