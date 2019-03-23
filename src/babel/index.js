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
      type: 'checkbox',
      name: 'babel',
      message: 'Ecmascript presets (Babel):',
      choices: ['env'],
      default: this.get('babel'),
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }

  configuring () {
    const babel = this.get('babel');
    const deps = {};

    if (babel.includes('env')) {
      Object.assign(deps, {
        'babel-core': '*',
        'babel-preset-env': '*',
        'babel-plugin-add-module-exports': '*',
        'gulp-babel': '*',
      });
      this.composeWith('write-gulpfile');
      this.addDevDeps(deps);
    }
  }
}
