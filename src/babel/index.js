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

  configuring () {
    const babel = this.get('babel');
    const deps = {};

    switch (babel) {
    case 'es2017':
      Object.assign(deps, {'babel-preset-es2017': '*'});
      // FALL THROUGH

    case 'es2016':
      Object.assign(deps, {'babel-preset-es2016': '*'});
      // FALL THROUGH

    case 'es2015':
      Object.assign(deps, {
        'babel-preset-es2015': '*',
        'babel-plugin-add-module-exports': '*',
        'gulp-babel': '*',
      });
      this.composeWith('write-gulpfile');
      this.addDevDeps(deps);
    }
  }
}
