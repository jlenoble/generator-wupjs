import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-ignore',
    }, opts);

    super(args, options);

    this.promptIfMissing(['preprocessors']);
    this.composeWith('github');
  }

  writing () {
    const props = this.getProps();
    props.sassCache = this._sassCache();

    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'),
      props
    );
  }

  _sassCache () {
    return this.has('Compass') ? '.sass-cache' : '';
  }
}
