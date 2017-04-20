import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['babel'],
      generator: 'babel',
    }, opts);

    super(args, options);
  }

  prompting () {
    const prompts = [{
      type: 'list',
      name: 'babel',
      message: 'Ecmascript presets (Babel):',
      choices: ['none', 'es2015', 'es2016', 'es2017', 'env'],
      default: this.get('babel'),
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }
}
