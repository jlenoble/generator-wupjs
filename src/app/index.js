import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'app',
    }, opts);

    super(args, options);

    this.composeWith('module');
    this.composeWith('who');
    this.composeWith('github');
    this.composeWith('license');
    this.composeWith('babel');
    this.composeWith('lint');
    this.composeWith('test');
    this.composeWith('write-gulpfile');
    this.composeWith('write-gulp-build');
    this.composeWith('write-gulp-clean');
    this.composeWith('write-gulp-distclean');
    this.composeWith('write-gulp-dist');
    this.composeWith('write-src');
  }

  end () {}
}
