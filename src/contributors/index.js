import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['contributors'],
      generator: 'contributors',
    }, opts);

    super(args, options);
  }

  initializing () {
    if (!this.get('contributors')) {
      this.set({contributors: []});
    }
  }
}
