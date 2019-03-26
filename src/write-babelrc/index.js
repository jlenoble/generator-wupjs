import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-babelrc',
    }, opts);

    super(args, options);

    this.promptIfMissing(['babel', 'addons']);
  }

  writing () {
    const props = this.getProps();

    if (this.has('Babel')) {
      props.presets = this._presets();
      props.plugins = this._plugins();

      this.fs.copyTpl(
        this.templatePath('babelrc.ejs'),
        this.destinationPath('.babelrc'),
        props
      );
    }
  }

  _plugins () {
    return Object.keys(this.get('devDeps')).filter(dep => {
      return dep.match(/babel-plugin/);
    }).map(dep => '"' + dep.replace('babel-plugin-', '') + '"').join(',\n    ');
  }

  _presets () {
    const presets = [];

    if (this.get('babel').includes('env')) {
      presets.push(`["@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }]`);
    }

    if (this.has('React')) {
      presets.push('"@babel/preset-react"');
    }

    return presets.map(preset => `${preset}`).join(',\n    ');
  }
}
