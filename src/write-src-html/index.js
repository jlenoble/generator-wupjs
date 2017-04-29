import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-src-html',
    }, opts);

    super(args, options);

    this.promptIfMissing(['buildDir', 'addons']);
    this.composeWith('write-gulp-bundle');
  }

  writing () {
    const props = this.getProps();
    props.bundleGlob = this.compute('bundleGlob');

    this.fs.copyTpl(
      this.templatePath('index.ejs'),
      this.destinationPath(this.filepaths('indexPage')),
      props
    );
  }
}
