import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['addons'],
      generator: 'addons',
    }, opts);

    super(args, options);
  }

  prompting () {
    const prompts = [{
      type: 'checkbox',
      name: 'addons',
      message: 'Use vendor libraries:',
      choices: ['React', 'Enzyme'],
      default: this.get('addons'),
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
      if (this.has('Enzyme') && !this.has('React')) {
        const addons = this.get('addons');
        addons.push('React');
        this.set({addons});
      }
    });
  }

  configuring () {
    const addons = this.get('addons');
    if (addons.length === 0) {
      return;
    }

    if (addons.includes('React')) {
      this.addDeps({
        'react': '*',
        'react-dom': '*',
      });
      this.addDevDeps({
        'babel-preset-react': '*',
        'babel-plugin-add-module-exports': '*',
        'gulp-babel': '*',
      });
    }

    if (addons.includes('Enzyme')) {
      this.addDevDeps({
        'enzyme': '*',
        'chai': '*',
        'chai-enzyme': '*',
      });
    }
  }
}
