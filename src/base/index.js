import {Base} from 'yeoman-generator';
import path from 'path';
import slug from 'slug';
import upperCamelCase from 'uppercamelcase';
import {Config, getGenerator, getWriteGenerators,
  extendProps, extendedProps} from '../helpers';

const appDir = __dirname;
const conf = new Config();

export default class extends Base {
  constructor (args, opts) {
    super(args, opts);

    conf.initialize();

    if (!opts.generator) {
      throw new Error('opts.generator must be defined');
    }

    conf.addGen(opts.generator);

    if (conf.listeners('change').length === 0) {
      conf.on('change', propName => this.writeIfChanged(propName));
    }

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

    this.composeWith('gen-version');
    this.composeWith('date');

    extendProps(this);
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

  writeIfChanged (propName) {
    const generators = getWriteGenerators(propName);

    generators.forEach(gen => {
      this.composeWith(gen);
    });
  }

  addDeps (_deps) {
    const deps = this.get('deps') || {};
    Object.assign(deps, _deps);

    this.promptIfMissing(['deps']);
    this.set({deps});
  }

  addDevDeps (_devDeps) {
    const devDeps = this.get('devDeps') || {};
    Object.assign(devDeps, _devDeps);

    this.promptIfMissing(['devDeps']);
    this.set({devDeps});
  }

  addPeerDeps (_peerDeps) {
    const peerDeps = this.get('peerDeps') || {};
    Object.assign(peerDeps, _peerDeps);

    this.promptIfMissing(['peerDeps']);
    this.set({peerDeps});
  }

  addGulpIncludes (_gulpIncludes) {
    const gulpIncludes = this.get('gulpIncludes') || [];
    const set = new Set(gulpIncludes.concat(_gulpIncludes));

    this.promptIfMissing(['gulpIncludes']);
    this.set({gulpIncludes: [...set]});
  }

  has (vendorLibrary) {
    const libname = vendorLibrary.toLowerCase();

    switch(libname) {
    case 'babel':
      return this.get('babel') !== 'none' || this.has('React');

    case 'compass':
      return this.hasPreprocessor(libname);

    case 'enzyme': case 'react':
      return this.hasAddon(libname);

    case 'phantomjs':
      return this.has('React') || this.has('Compass');

    default:
      return false;
    }
  }

  hasAddon (name) {
    try {
      return this.get('addons').map(str => str.toLowerCase())
        .includes(name.toLowerCase());
    } catch (e) {
      throw new Error(
        `Property 'addons' is undefined: You should add a
   this.promptIfMissing(['addons']) in the ctor of this generator`);
    }
  }

  hasPreprocessor (name) {
    try {
      return this.get('preprocessors').map(str => str.toLowerCase())
        .includes(name.toLowerCase());
    } catch (e) {
      throw new Error(
        `Property 'preprocessors' is undefined: You should add a
   this.promptIfMissing(['preprocessors']) in the ctor of this generator`);
    }
  }

  compute (propName) {
    switch (propName) {
    case 'className':
      return upperCamelCase(this.get('name'));

    case 'cYear':
      {
        const created = this.get('created').getFullYear();
        const updated = this.get('updated').getFullYear();
        let cYear = created < updated ? created + '-' : '';
        cYear += updated;
        return cYear;
      }

    case 'externalReact':
      return this.has('React') ? `\n    .external('react/addons')
    .external('react/lib/ReactContext')
    .external('react/lib/ExecutionEnvironment')` : '';

    case 'fileStem':
      {
        let filestem = this.className[0].toLowerCase() +
          this.className.substring(1);
        filestem = filestem.replace(/[A-Z]/g, function (s) {
          return '-' + s;
        });
        return slug(filestem, {lower: true});
      }

    case 'importBabel':
      return this.has('Babel') ? `import babel from 'gulp-babel';\n` : '';

    case 'main':
      return path.join(this.get('libDir'), this.compute('module')) + '.js';

    case 'module':
      return this.get('name').replace(/\s+/g, '-').toLowerCase();

    case 'name':
      return this.appname;

    case 'pipeBabel':
      return this.has('Babel') ? '\n    .pipe(babel())' : '';
    }
  }

  get (name) {
    return conf.get(name);
  }

  getProps () {
    const props = conf.getProps();

    extendedProps.forEach(func => {
      props[func] = this[func];
    });

    return props;
  }

  set (name, value) {
    const props = value === undefined ? name : {[name]: value};

    Object.keys(props).forEach(name => {
      conf.set(name, props[name]);
    });

    const _props = Object.assign({}, props);
    delete _props.gulpIncludes; // Global, but recomputed each time
    this.config.set(_props);
  }
}

Base.reset = function () {
  if (typeof conf.reset === 'function') {
    conf.reset();
  }
};
