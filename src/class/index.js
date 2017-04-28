import Base from '../base';
import path from 'path';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'class',
    }, opts);

    super(args, options);

    this.promptIfMissing(['srcDir', 'testDir', 'name']);
    this.addDevDeps({muter: '*'});
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

    const filename = this.compute('fileStem') + '.js';
    const testFilename = this.compute('fileStem') + '.test.js';

    props.Class = this.compute('className');
    props.module = this.compute('module');

    this.fs.copyTpl(
      this.templatePath('class.ejs'),
      this.destinationPath(path.join(props.srcDir, filename)),
      props
    );

    this.fs.copyTpl(
      this.templatePath('class.test.ejs'),
      this.destinationPath(path.join(props.testDir, testFilename)),
      props
    );
  }
}
