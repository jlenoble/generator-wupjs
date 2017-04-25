import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['preprocessors'],
      generator: 'preprocessors',
    }, opts);

    super(args, options);
  }

  prompting () {
    const prompts = [{
      type: 'checkbox',
      name: 'preprocessors',
      message: 'Use preprocessors:',
      choices: ['Compass'],
      default: this.get('preprocessors'),
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
      if (this.has('Compass')) {
        this.composeWith('write-gulp-sass');
        this.composeWith('write-scss');
      }
    });
  }

  configuring () {
    const addons = this.get('preprocessors');
    if (addons.length === 0) {
      return;
    }

    if (addons.includes('Compass')) {
      this.addDevDeps({
        'gulp-compass': '*',
      });
    }
  }
}
