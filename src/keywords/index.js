import path from 'path';
import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['keywords'],
      generator: 'keywords',
    }, opts);

    super(args, options);
  }

  configuring () {
    try {
      const {keywords} = require(path.join(process.cwd(), 'package.json'));
      this.set({keywords});
    } catch (e) {}

    if (!this.get('keywords')) {
      this.set({keywords: []});
    }
  }
}
