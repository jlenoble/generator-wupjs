import path from 'path';
import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['version'],
      generator: 'version',
    }, opts);

    super(args, options);
  }

  configuring () {
    try {
      const {version} = require(path.join(process.cwd(), 'package.json'));
      this.set({version});
    } catch (e) {}

    if (!this.get('version')) {
      this.set({version: '0.0.0'});
    }
  }
}
