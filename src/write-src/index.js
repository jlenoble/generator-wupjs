import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-src',
    }, opts);

    super(args, options);

    this.promptIfMissing(['addons']);
  }

  configuring () {
    if (!this.hasWupYoRc) { // First use of generator, add default sources
      if (this.has('React')) {
        this.composeWith('component');
      } else {
        this.composeWith('class');
      }
    }
  }
}
