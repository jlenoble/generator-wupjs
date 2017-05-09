import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-gulp-watch',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir', 'addons', 'preprocessors']);
    this.addGulpIncludes(['watch']);
  }

  writing () {
    const props = this.getProps();
    props.parsers = this.get('parsers');

    props.consts = this._consts(props);
    props.imports = this._imports();
    props.gulpWatchTasks = this._gulpWatchTasks();

    this.fs.copyTpl(
      this.templatePath('watch.ejs'),
      this.destinationPath(path.join(props.gulpDir, 'watch.js')),
      props
    );
  }

  _consts (props) {
    let consts = `const allSrcGlob = ${this.globs('src,test,!parser:**:js')};
const allBuildGlob = ${this.globs('build#src,test:**:js')};\n`;

    if (this.has('Compass')) {
      consts += `const allSassGlob = ${this.globs('sass:**')};\n`;
    }

    if (this.has('PhantomJS')) {
      consts += `const srcBuildGlob = ${this.globs('build#src:**:js')};
const testBundleGlob = '${this.filepaths('testBundle')}';\n`;
    }

    if (this.has('ANTLR4')) {
      const hints = ['data:**:*', 'parser:' + this.get('grammar') +
        'Parser.js'];

      if (props.parsers.includes('Listener')) {
        hints.push('listener:' + this.get('listener') + '.js');
      }

      if (props.parsers.includes('Visitor')) {
        hints.push('visitor:' + this.get('visitor') + '.js');
      }

      consts += `const grammarGlob = ${this.globs('grammar:**:g4')};\n`;
      consts += `const dataGlob = ${this.globs(hints)};\n`;
    }

    return consts;
  }

  _gulpWatchTasks () {
    let tasks = 'gulp.watch(allSrcGlob, build);\n';

    if (this.has('PhantomJS')) {
      tasks += 'gulp.watch(srcBuildGlob, bundle);\n';
      tasks += 'gulp.watch(allBuildGlob, testBundle);\n';
      tasks += 'gulp.watch(testBundleGlob, test);\n';
    } else {
      tasks += 'gulp.watch(allBuildGlob, test);\n';
    }

    if (this.has('Compass')) {
      tasks += 'gulp.watch(allSassGlob, sass);\n';
    }

    if (this.has('ANTLR4')) {
      tasks += 'gulp.watch(grammarGlob, makeParser);\n';
      tasks += 'gulp.watch(dataGlob, parse);\n';
    }

    return tasks.replace(/\n/g, '\n  ');
  }

  _imports () {
    let imports = `import gulp from 'gulp';
import {build} from './build';
import {test} from './test';\n`;

    if (this.has('PhantomJS')) {
      if (this.has('Compass')) {
        imports += `import {sass} from './sass';\n`;
      }
      imports += `import {bundle} from './bundle';
import {testBundle} from './test-bundle';\n`;
    }

    if (this.has('ANTLR4')) {
      imports += `import {makeParser, parse} from './parse';\n`;
    }

    return imports;
  }
}
