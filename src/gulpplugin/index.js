import Base from '../base';
import path from 'path';
import camelcase from 'camelcase';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'gulpplugin',
    }, opts);

    super(args, options);

    this.promptIfMissing(['srcDir', 'testDir', 'name']);
    this.addDeps({
      'gulp-util': '*',
      'through2': '*',
    });
    this.addDevDeps({
      'child-process-data': '*',
    });
  }

  initializing () {
    this.argument('className', {type: String, required: false});
  }

  configuring () {
    if (!this.className) {
      this.className = this.compute('className');
    }
  }

  writing () {
    const props = this.getProps();

    let fileStem = this.compute('fileStem');
    const index = fileStem.indexOf('gulp-') === -1 ? 0 : 5;

    props.pluginFunc = camelcase(fileStem);

    fileStem = 'gulp-' + fileStem.substring(index);

    props.pluginName = fileStem;

    const filename = fileStem + '.js';
    const testFilename = fileStem + '.test.js';

    props.pluginPath = path.join(this.rel('test:src'), filename);
    props.pluginPath2 = path.join(this.rel('gulpfiles:src'), filename);

    const gulpfilesDir = this.dirs('gulpfilesDir');
    props.gulpfileName = 'gulpfile.babel.js';
    props.gulpfilePath = path.join(gulpfilesDir, props.gulpfileName);
    props.pluginSrcGlob = this.indent([this.globs('sources:**:*'), 2]);

    this.fs.copyTpl(
      this.templatePath('plugin.ejs'),
      this.destinationPath(path.join(props.srcDir, filename)),
      props
    );

    this.fs.copyTpl(
      this.templatePath('plugin.test.ejs'),
      this.destinationPath(path.join(props.testDir, testFilename)),
      props
    );

    this.fs.copyTpl(
      this.templatePath('gulpfile.babel.ejs'),
      this.destinationPath(props.gulpfilePath),
      props
    );
  }
}
