import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulpfile',
    }, opts);

    super(args, options);
  }

  writing () {
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
  }
}
