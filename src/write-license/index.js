import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-license',
    }, opts);

    super(args, options);

    this.promptIfMissing(['author', 'email', 'license', 'created', 'updated']);
  }

  writing () {
    const props = this.getProps();
    props.cYear = this.compute('cYear');

    this.fs.copyTpl(
      this.templatePath('LICENSE_' + props.license),
      this.destinationPath('LICENSE'),
      props
    );
  }
}
