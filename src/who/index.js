import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['author', 'email'],
      generator: 'who',
    }, opts);

    super(args, options);
  }

  prompting () {
    const prompts = [{
      type: 'input',
      name: 'author',
      message: 'Author\'s name:',
      default: this.get('author'),
    }, {
      type: 'input',
      name: 'email',
      message: 'Email address:',
      default: this.get('email'),
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }
}
