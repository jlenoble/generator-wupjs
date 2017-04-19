import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['license'],
      generator: 'license',
    }, opts);

    super(args, options);

    this.composeWith('date');
    this.composeWith('gen-version');

    this.promptIfMissing(['author', 'email']);
  }

  prompting () {
    const prompts = [{
      type: 'list',
      name: 'license',
      message: 'LICENSE:',
      choices: ['MIT', 'GPL-3.0'],
      default: this.get('license'),
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
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
