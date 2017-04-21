import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['testRunners'],
      generator: 'test',
    }, opts);

    super(args, options);
  }

  prompting () {
    const prompts = [{
      type: 'checkbox',
      name: 'testRunners',
      message: 'Test runners:',
      choices: ['Mocha'],
      default: this.get('testRunners'),
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }

  configuring () {
    const testRunners = this.get('testRunners');
    if (testRunners.length === 0) {
      return;
    }

    if (testRunners.includes('Mocha')) {
      this.addDevDeps({
        'gulp-mocha': '*',
        'chai': '*',
      });
    }

    this.composeWith('write-gulp-test');
  }
}
