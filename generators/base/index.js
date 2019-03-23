'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _slug = require('slug');

var _slug2 = _interopRequireDefault(_slug);

var _uppercamelcase = require('uppercamelcase');

var _uppercamelcase2 = _interopRequireDefault(_uppercamelcase);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appDir = __dirname;
const conf = new _helpers.Config();

exports.default = class extends _yeomanGenerator2.default {
  constructor(args, opts) {
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
      if (!conf.has(name)) {
        // Avoid triggering a 'change' event
        conf.add(name); // Undefined value forces prompting
      }
    });

    this.composeWith('gen-version');
    this.composeWith('date');

    (0, _helpers.extendProps)(this);
  }

  composeWith(genDir) {
    const dir = _path2.default.join(appDir, '..', genDir);

    if (!conf.hasGen(genDir)) {
      super.composeWith(dir);
      conf.addGen(genDir);
    }
  }

  promptIfMissing(propNames) {
    const generators = {};

    propNames.forEach(propName => {
      if (!this.get(propName)) {
        const genName = (0, _helpers.getGenerator)(propName);
        if (genName) {
          generators[genName] = true;
        }
      }
    });

    Object.keys(generators).forEach(gen => {
      this.composeWith(gen);
    });
  }

  writeIfChanged(propName) {
    const generators = (0, _helpers.getWriteGenerators)(propName);

    generators.forEach(gen => {
      this.composeWith(gen);
    });
  }

  addDeps(_deps) {
    const deps = this.get('deps') || {};
    Object.assign(deps, _deps);

    this.promptIfMissing(['deps']);
    this.set({ deps });
  }

  addDevDeps(_devDeps) {
    const devDeps = this.get('devDeps') || {};
    Object.assign(devDeps, _devDeps);

    this.promptIfMissing(['devDeps']);
    this.set({ devDeps });
  }

  addPeerDeps(_peerDeps) {
    const peerDeps = this.get('peerDeps') || {};
    Object.assign(peerDeps, _peerDeps);

    this.promptIfMissing(['peerDeps']);
    this.set({ peerDeps });
  }

  addGulpIncludes(_gulpIncludes) {
    const gulpIncludes = this.get('gulpIncludes') || [];
    const set = new Set(gulpIncludes.concat(_gulpIncludes));

    this.promptIfMissing(['gulpIncludes']);
    this.set({ gulpIncludes: [...set] });
  }

  has(vendorLibrary) {
    const libname = vendorLibrary.toLowerCase();

    switch (libname) {
      case 'babel':
        return this.get('babel') !== 'none' || this.has('React');

      case 'compass':
        return this.hasPreprocessor(libname);

      case 'enzyme':case 'react':case 'antlr4':
        return this.hasAddon(libname);

      case 'phantomjs':
        return this.has('React') || this.has('Compass');

      default:
        return false;
    }
  }

  hasAddon(name) {
    try {
      return this.get('addons').map(str => str.toLowerCase()).includes(name.toLowerCase());
    } catch (e) {
      throw new Error(`Property 'addons' is undefined: You should add a
   this.promptIfMissing(['addons']) in the ctor of this generator`);
    }
  }

  hasPreprocessor(name) {
    try {
      return this.get('preprocessors').map(str => str.toLowerCase()).includes(name.toLowerCase());
    } catch (e) {
      throw new Error(`Property 'preprocessors' is undefined: You should add a
   this.promptIfMissing(['preprocessors']) in the ctor of this generator`);
    }
  }

  compute(propName) {
    switch (propName) {
      case 'className':
        return (0, _uppercamelcase2.default)(this.get('name'));

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
          let filestem = this.className[0].toLowerCase() + this.className.substring(1);
          filestem = filestem.replace(/[A-Z]/g, function (s) {
            return '-' + s;
          });
          return (0, _slug2.default)(filestem, { lower: true });
        }

      case 'importBabel':
        return this.has('Babel') ? `import babel from 'gulp-babel';\n` : '';

      case 'main':
        return _path2.default.join(this.get('libDir'), this.compute('module')) + '.js';

      case 'module':
        return this.get('name').replace(/\s+/g, '-').toLowerCase();

      case 'name':
        return this.appname;

      case 'nodeVersion':
        return '>=' + process.version.substring(1);

      case 'pipeBabel':
        return this.has('Babel') ? '\n    .pipe(babel())' : '';
    }
  }

  get(name) {
    return conf.get(name);
  }

  getProps() {
    const props = conf.getProps();

    _helpers.extendedProps.forEach(func => {
      props[func] = this[func];
    });

    return props;
  }

  set(name, value) {
    const props = value === undefined ? name : { [name]: value };

    Object.keys(props).forEach(name => {
      conf.set(name, props[name]);
    });

    const _props = Object.assign({}, props);
    delete _props.gulpIncludes; // Global, but recomputed each time
    this.config.set(_props);
  }
};


_yeomanGenerator2.default.reset = function () {
  if (typeof conf.reset === 'function') {
    conf.reset();
  }
};
module.exports = exports.default;