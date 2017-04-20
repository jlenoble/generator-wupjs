import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulpfile',
    }, opts);

    super(args, options);

    this.composeWith('write-package');
  }

  writing () {
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
  }

  install () {
    this.npmInstall(['gulp@git://github.com/gulpjs/gulp.git#4.0'],
      {'save-dev': true});
  }
}
