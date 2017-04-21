import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-eslintrc',
    }, opts);

    super(args, options);

    this.promptIfMissing(['babel', 'linters', 'addons']);
  }

  writing () {
    const props = this.getProps();
    props.ecmaVersion = this.compute('ecmaVersion');
    props.ecmaFeatures = this.compute('ecmaFeatures');
    props.esLintPlugins = this.compute('esLintPlugins');
    props.esLintRules = this.compute('esLintRules');

    if (props.linters.includes('EsLint')) {
      this.fs.copyTpl(
        this.templatePath('eslintrc.ejs'),
        this.destinationPath('.eslintrc'),
        props
      );
    }
  }
}
