import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['version'],
      generator: 'version',
    }, opts);

    super(args, options);
  }

  initializing () {
    if (!this.get('version')) {
      this.set({version: '0.0.0'});
    }
  }
}
