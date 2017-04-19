import Base from '../base';
import path from 'path';

const appDir = __dirname;
const packageJson = path.join(appDir, '../../package.json');

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['genVersion'],
      generator: 'gen-version',
    }, opts);

    super(args, options);
  }

  initializing () {
    const props = {};
    const genVersion = this.fs.readJSON(packageJson, {}).version;

    props.genVersion = genVersion;

    this.set(props);
  }
}
