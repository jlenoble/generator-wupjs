import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-sass',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'buildDir', 'srcDir', 'preprocessors']);
    this.addGulpIncludes(['sass']);
    this.composeWith('write-gulpfile');
    this.addDevDeps({'gulp-sourcemaps': '*'});
  }

  writing () {
    const props = this.getProps();
    props.sassDir = this.compute('sassDir');
    props.sassImportDir = this.compute('sassImportDir');
    props.sassGlob = this.compute('sassGlob');

    this.fs.copyTpl(
      this.templatePath('sass.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'sass.js')),
      props
    );
  }
}
