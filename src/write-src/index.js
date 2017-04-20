import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      generator: 'write-src',
    }, opts);

    super(args, options);
  }

  initializing () {
    this.composeWith('class');
  }
}
