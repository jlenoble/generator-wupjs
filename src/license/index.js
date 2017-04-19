import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['license'],
      generator: 'license',
    }, opts);

    super(args, options);
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
}
