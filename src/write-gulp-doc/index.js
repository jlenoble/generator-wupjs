import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-doc',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'addons', 'buildDir', 'name',
      'description']);
    this.addGulpIncludes(['doc']);
    this.addDevDeps({
      'gulp-rename': '*',
      'gulp-replace': '*',
      'gulp-wrap': '*',
      'markdown-include': '*',
    });
    this.composeWith('who');
    this.composeWith('license');
    this.composeWith('write-gulpfile');
  }

  writing () {
    const props = this.getProps();
    props.contents = this._contents();
    props.docConf = this.filepaths('docConf');
    props.docDir = this.dirs('docDir');
    props.name = this.get('name');
    props.cYear = this.compute('cYear');

    this.fs.copyTpl(
      this.templatePath('doc.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'doc.js')),
      props
    );

    if (!this.hasWupYoRc) {
      // Don't overwrite doc index if already exists
      this.fs.copyTpl(
        this.templatePath('index.ejs'),
        this.destinationPath(path.join(this.dirs('docDir'), 'index.md')),
        props
      );
    }

    this.fs.copyTpl(
      this.templatePath('license.ejs'),
      this.destinationPath(path.join(this.dirs('docDir'), 'license.md')),
      props
    );

    this.fs.copyTpl(
      this.templatePath('markdown.ejs'),
      this.destinationPath('markdown.json'),
      props
    );
  }

  _contents () {
    return `<%= contents %>`;
  }
}
