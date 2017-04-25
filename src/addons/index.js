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
      choices: ['React'],
      default: this.get('addons'),
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
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
        'react-addons-test-utils': '*',
        'babel-plugin-add-module-exports': '*',
        'gulp-babel': '*',
      });
    }
  }
}
