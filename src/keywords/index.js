import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['keywords'],
      generator: 'keywords',
    }, opts);

    super(args, options);
  }

  initializing () {
    if (!this.get('keywords')) {
      this.set({keywords: []});
    }
  }
}
