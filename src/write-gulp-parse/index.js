import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-parse',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'addons', 'listener', 'rule', 'grammar']);
    this.addGulpIncludes(['parse']);
    this.composeWith('write-gulpfile');
  }

  writing () {
    const props = this.getProps();
    const grammarDir = this.dirs('grammarDir');
    const dataDir = this.dirs('dataDir');

    props.parserDir = this.dirs('parserDir');
    props.listenerDir = this.dirs('listenerDir');
    props.grammarGlob = this.globs('grammar:**:g4');
    props.dataGlob = this.globs('data:**:*');
    props.listener = this.get('listener');
    props.rule = this.get('rule');
    props.grammar = this.get('grammar');

    this.fs.copyTpl(
      this.templatePath('parse.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'parse.js')),
      props
    );

    this.fs.copyTpl(
      this.templatePath('grammar.ejs'),
      this.destinationPath(path.join(grammarDir, 'Calc.g4')),
      props
    );

    this.fs.copyTpl(
      this.templatePath('data.ejs'),
      this.destinationPath(path.join(dataDir, 'data.txt')),
      props
    );

    this.fs.copyTpl(
      this.templatePath('interpreter.ejs'),
      this.destinationPath(path.join(props.listenerDir,
        props.listener + '.js')),
      props
    );
  }
}
