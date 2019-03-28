import path from 'path';
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
    try {
      const json = require(path.join(process.cwd(), '.yo-rc.json'));
      if (json['generator-wupjs'] !== undefined) {
        return; // Project already initialized, don't overwrite default sources
      }
    } catch (e) {}

    if (this.has('React')) {
      this.composeWith('component');
    } else {
      this.composeWith('class');
    }
  }
}
