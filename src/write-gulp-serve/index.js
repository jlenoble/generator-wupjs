import Base from '../base';
import path from 'path';
import stringify from 'json-stable-stringify';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-serve',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'srcDir', 'buildDir', 'preprocessors']);
    this.addGulpIncludes(['serve']);
    this.addDevDeps({'browser-sync': '*'});
    this.composeWith('write-gulp-bundle');
  }

  configuring () {
    if (this.has('Compass')) {
      this.composeWith('write-gulp-sass');
    }
  }

  writing () {
    const props = this.getProps();
    props.imports = this._imports();
    props.consts = this._consts();
    props.preServeTask = this._preServeTask();

    this.fs.copyTpl(
      this.templatePath('serve.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'serve.js')),
      props
    );
  }

  _consts () {
    let consts = `const buildDir = '${this.dirs('buildDir')}';
const staticDir = '${this.dirs('staticDir')}';
const nodeDir = '${this.dirs('nodeDir')}';
const bsWatchGlob = `;

    if (this.has('Compass')) {
      consts += stringify([path.join(this.dirs('staticDir'), 'index.html'),
        path.join(this.get('buildDir'), this.compute('bundleName')),
        path.join(this.dirs('cssDir'), '**/*.scss')],
        {space: 2}).replace(/"/g, `'`);
    } else {
      consts += stringify([path.join(this.dirs('staticDir'), 'index.html'),
        path.join(this.get('buildDir'), this.compute('bundleName'))],
        {space: 2}).replace(/"/g, `'`);
    }

    consts += ';';

    return consts;
  }

  _imports () {
    return `import './bundle';${this.has('Compass') ? '\nimport \'./sass\';' :
      ''}`;
  }

  _preServeTask () {
    return this.has('Compass') ? `gulp.parallel('bundle', 'sass')` : `'bundle'`;
  }
}
