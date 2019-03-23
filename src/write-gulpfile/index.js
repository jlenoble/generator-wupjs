import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['gulpIncludes'],
      generator: 'write-gulpfile',
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir']);
    this.addDevDeps({
      'gulp': '*',
      'plumb-gulp': '*',
      'autoreload-gulp': '*',
    });
  }

  initializing () {
    this.set({gulpIncludes: this.get('gulpIncludes') || []});
  }

  writing () {
    const props = this.getProps();

    this.fs.copyTpl(
      this.templatePath('gulpfile.ejs'),
      this.destinationPath('gulpfile.babel.js'),
      props
    );
  }
}
