import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-babel',
    }, opts);

    super(args, options);

    this.promptIfMissing(['babel']);
    this.addDevDeps({'babel-plugin-add-module-exports': '*'});
  }

  writing () {
    const props = this.getProps();
    let presets = [];

    switch (props.babel) {
    case 'es2017':
      presets.push('es2017');
      // FALL THROUGH

    case 'es2016':
      presets.push('es2016');
      // FALL THROUGH

    case 'es2015':
      presets.push('es2015');
    }

    presets.reverse();
    presets = presets.map(preset => `"${preset}"`).join(', ');
    props.presets = presets;

    props.babelPlugins = Object.keys(props.devDeps).filter(dep => {
      return dep.match(/babel-plugin/);
    }).map(dep => '"' + dep.replace('babel-plugin-', '') + '"').join(', ');

    this.fs.copyTpl(
      this.templatePath('babelrc.ejs'),
      this.destinationPath('.babelrc'),
      props
    );
  }
}
