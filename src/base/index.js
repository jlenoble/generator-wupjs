import {Base} from 'yeoman-generator';
import path from 'path';
import Config from '../config';
import getGenerator from '../get-generator';

const appDir = __dirname;
const conf = new Config();

export default class extends Base {
  constructor (args, opts) {
    super(args, opts);

    conf.addGen(opts.generator);

    let props = opts.props;

    if (props) {
      if (!Array.isArray(props)) {
        if (typeof props === 'string') {
          props = props.split(',');
        } else {
          props = [];
        }
      }
    } else {
      props = [];
    }

    props.forEach(name => {
      if (!conf.has(name)) { // Avoid triggering a 'change' event
        conf.add(name); // Undefined value forces prompting
      }
    });
  }

  composeWith (genDir) {
    const dir = path.join(appDir, '..', genDir);

    if (!conf.hasGen(genDir)) {
      super.composeWith(dir);
      conf.addGen(genDir);
    }
  }

  promptIfMissing (propNames) {
    const generators = {};

    propNames.forEach(propName => {
      if (!this.get(propName)) {
        const genName = getGenerator(propName);
        if (genName) {
          generators[genName] = true;
        }
      }
    });

    Object.keys(generators).forEach(gen => {
      this.composeWith(gen);
    });
  }

  get (name) {
    return conf.get(name);
  }

  set (name, value) {
    const props = value === undefined ? name : {[name]: value};
    this.config.set(props);

    Object.keys(props).forEach(name => {
      conf.set(name, props[name]);
    });
  }
}

Base.reset = function () {
  conf.reset();
};
