import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-build',
    }, opts);

    super(args, options);

    this.promptIfMissing(['babel', 'gulpDir', 'buildDir', 'srcDir']);
    this.addGulpIncludes(['build']);
    this.composeWith('write-gulpfile');
    this.addDevDeps({'gulp-sourcemaps': '*'});
  }

  writing () {
    const props = this.getProps();
    props.allSrcGlob = this.compute('allSrcGlob');
    props.importBabel = this.compute('importBabel');
    props.pipeBabel = this.compute('pipeBabel');

    this.fs.copyTpl(
      this.templatePath('build.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'build.js')),
      props
    );
  }
}
