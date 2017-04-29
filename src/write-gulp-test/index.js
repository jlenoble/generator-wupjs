import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-test',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'testDir', 'buildDir', 'addons',
      'preprocessors']);
    this.addDevDeps({'chai': '*'});
    this.addGulpIncludes(['test']);
    this.composeWith('write-gulpfile');
  }

  configuring () {
    if (this.has('React')) {
      this.addDevDeps({
        'gulp-mocha-phantomjs': '*',
        'mocha': '*',
      });
    } else {
      this.addDevDeps({
        'gulp-mocha': '*',
      });
    }
  }

  writing () {
    const props = this.getProps();
    props.imports = this._imports();
    props.testGlob = this._testGlob();
    props.gulpMochaCallback = this._gulpMochaCallback();
    props.onMochaEnd = this._onMochaEnd();
    props.preTestTask = this._preTestTask();

    this.fs.copyTpl(
      this.templatePath('test.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'test.js')),
      props
    );
  }

  _gulpMocha () {
    return this.has('PhantomJS') ? 'gulp-mocha-phantomjs' : 'gulp-mocha';
  }

  _gulpMochaCallback () {
    return this.has('PhantomJS') ? 'done' : '()';
  }

  _imports () {
    let imports = `import gulp from 'gulp';
import mocha from '${this._gulpMocha()}';
import '${this.has('React') ? './test-bundle' : './build'}'`;

    if (this.has('Compass')) {
      imports += `\nimport './sass';`;
    }

    return imports;
  }

  _onMochaEnd () {
    return this.has('PhantomJS') ? `
      .on('end', done)` : '';
  }

  _preTestTask () {
    if (this.has('Compass')) {
      return this.has('React') ? `gulp.parallel('test-bundle', 'sass')` :
        `gulp.parallel('build', 'sass')`;
    } else {
      return `'${this.has('React') ? 'test-bundle' : 'build'}'`;
    }
  }

  _testGlob () {
    return this.has('PhantomJS') ?
      `'${this.filepaths('runnerPage')}'` :
      this.globs('build#test:**:test.js');
  }
}
