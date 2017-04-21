import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-babelrc',
    }, opts);

    super(args, options);

    this.promptIfMissing(['babel']);
  }

  writing () {
    const props = this.getProps();

    if (props.babel !== 'none') {
      props.presets = this.compute('presets');
      props.babelPlugins = this.compute('babelPlugins');

      this.fs.copyTpl(
        this.templatePath('babelrc.ejs'),
        this.destinationPath('.babelrc'),
        props
      );
    }
  }
}
