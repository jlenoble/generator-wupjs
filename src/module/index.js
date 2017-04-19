import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['name', 'description'],
      generator: 'module',
    }, opts);

    super(args, options);
  }

  prompting () {
    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Package name:',
      default: this.get('name') || this.appname,
    }, {
      type: 'input',
      name: 'description',
      message: 'Package description:',
      default: this.get('description'),
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }
}
