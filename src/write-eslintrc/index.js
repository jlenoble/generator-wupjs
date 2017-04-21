import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-eslintrc',
    }, opts);

    super(args, options);

    this.promptIfMissing(['babel', 'linters']);
  }

  writing () {
    const props = this.getProps();

    if (props.linters.includes('EsLint')) {
      this.fs.copyTpl(
        this.templatePath('eslintrc.ejs'),
        this.destinationPath('.eslintrc'),
        props
      );
    }
  }
}
