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
  }
}
