import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-babel',
    }, opts);

    super(args, options);

    this.promptIfMissing(['babel']);
    this.addDevDeps({'babel-plugin-add-module-exports': '*'});
  }

  writing () {
    const props = this.getProps();
    props.presets = this.compute('presets');
    props.babelPlugins = this.compute('babelPlugins');

    this.fs.copyTpl(
      this.templatePath('babelrc.ejs'),
      this.destinationPath('.babelrc'),
      props
    );
  }
}
