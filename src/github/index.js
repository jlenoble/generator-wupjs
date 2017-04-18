import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['github'],
      generator: 'github',
    }, opts);

    super(args, options);

    this.composeWith('date');
    this.composeWith('gen-version');
  }

  prompting () {
    const prompts = [{
      type: 'input',
      name: 'github',
      message: 'GitHub user name:',
      default: this.get('github'),
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }
}
