import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulpfile',
    }, opts);

    super(args, options);

    this.addDevDeps({gulp: 'git://github.com/gulpjs/gulp.git#4.0'});
  }

  writing () {
    this.fs.copy(
      this.templatePath('gulpfile.ejs'),
      this.destinationPath('gulpfile.js')
    );
  }
}
