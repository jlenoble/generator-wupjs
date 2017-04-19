import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    super(args, opts);

    this.promptIfMissing(['author', 'email', 'license', 'created', 'updated']);
  }

  writing () {
    const props = {};
    const created = this.get('created').getFullYear();
    const updated = this.get('updated').getFullYear();

    props.author = this.get('author');
    props.email = this.get('email');
    props.license = this.get('license');

    if (created < updated) {
      props.cYear = created + '-';
    } else {
      props.cYear = '';
    }
    props.cYear += updated;

    this.fs.copyTpl(
      this.templatePath('LICENSE_' + props.license),
      this.destinationPath('LICENSE'),
      props
    );
  }
}
