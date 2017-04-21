import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['linters'],
      generator: 'lint',
    }, opts);

    super(args, options);
  }

  prompting () {
    const prompts = [{
      type: 'checkbox',
      name: 'linters',
      message: 'Linters:',
      choices: ['EsLint'],
      default: this.get('linters'),
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }

  configuring () {
    const linters = this.get('linters');
    if (linters.length === 0) {
      return;
    }

    if (linters.includes('EsLint')) {
      this.addDevDeps({
        'gulp-eslint': '*',
        'eslint-config-google': '*',
      });
    }

    this.composeWith('write-gulp-lint');
  }
}
