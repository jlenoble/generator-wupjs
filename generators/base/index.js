'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _yeomanGenerator = require('yeoman-generator');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _slug = require('slug');

var _slug2 = _interopRequireDefault(_slug);

var _uppercamelcase = require('uppercamelcase');

var _uppercamelcase2 = _interopRequireDefault(_uppercamelcase);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appDir = __dirname;
var conf = new _helpers.Config();

var _class = function (_Base) {
  _inherits(_class, _Base);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, opts));

    conf.initialize();

    if (!opts.generator) {
      throw new Error('opts.generator must be defined');
    }

    conf.addGen(opts.generator);

    if (conf.listeners('change').length === 0) {
      conf.on('change', function (propName) {
        return _this.writeIfChanged(propName);
      });
    }

    var props = opts.props;

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

    props.forEach(function (name) {
      if (!conf.has(name)) {
        // Avoid triggering a 'change' event
        conf.add(name); // Undefined value forces prompting
      }
    });

    _this.composeWith('gen-version');
    _this.composeWith('date');

    (0, _helpers.extendProps)(_this);
    return _this;
  }

  _createClass(_class, [{
    key: 'composeWith',
    value: function composeWith(genDir) {
      var dir = _path2.default.join(appDir, '..', genDir);

      if (!conf.hasGen(genDir)) {
        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'composeWith', this).call(this, dir);
        conf.addGen(genDir);
      }
    }
  }, {
    key: 'promptIfMissing',
    value: function promptIfMissing(propNames) {
      var _this2 = this;

      var generators = {};

      propNames.forEach(function (propName) {
        if (!_this2.get(propName)) {
          var genName = (0, _helpers.getGenerator)(propName);
          if (genName) {
            generators[genName] = true;
          }
        }
      });

      Object.keys(generators).forEach(function (gen) {
        _this2.composeWith(gen);
      });
    }
  }, {
    key: 'writeIfChanged',
    value: function writeIfChanged(propName) {
      var _this3 = this;

      var generators = (0, _helpers.getWriteGenerators)(propName);

      generators.forEach(function (gen) {
        _this3.composeWith(gen);
      });
    }
  }, {
    key: 'addDeps',
    value: function addDeps(_deps) {
      var deps = this.get('deps') || {};
      Object.assign(deps, _deps);

      this.promptIfMissing(['deps']);
      this.set({ deps: deps });
    }
  }, {
    key: 'addDevDeps',
    value: function addDevDeps(_devDeps) {
      var devDeps = this.get('devDeps') || {};
      Object.assign(devDeps, _devDeps);

      this.promptIfMissing(['devDeps']);
      this.set({ devDeps: devDeps });
    }
  }, {
    key: 'addPeerDeps',
    value: function addPeerDeps(_peerDeps) {
      var peerDeps = this.get('peerDeps') || {};
      Object.assign(peerDeps, _peerDeps);

      this.promptIfMissing(['peerDeps']);
      this.set({ peerDeps: peerDeps });
    }
  }, {
    key: 'addGulpIncludes',
    value: function addGulpIncludes(_gulpIncludes) {
      var gulpIncludes = this.get('gulpIncludes') || [];
      var set = new Set(gulpIncludes.concat(_gulpIncludes));

      this.promptIfMissing(['gulpIncludes']);
      this.set({ gulpIncludes: [].concat(_toConsumableArray(set)) });
    }
  }, {
    key: 'has',
    value: function has(vendorLibrary) {
      var libname = vendorLibrary.toLowerCase();

      switch (libname) {
        case 'babel':
          return this.get('babel') !== 'none' || this.has('React');

        case 'compass':
          return this.hasPreprocessor(libname);

        case 'enzyme':case 'react':
          return this.hasAddon(libname);

        case 'phantomjs':
          return this.has('React') || this.has('Compass');

        default:
          return false;
      }
    }
  }, {
    key: 'hasAddon',
    value: function hasAddon(name) {
      try {
        return this.get('addons').map(function (str) {
          return str.toLowerCase();
        }).includes(name.toLowerCase());
      } catch (e) {
        throw new Error('Property \'addons\' is undefined: You should add a\n   this.promptIfMissing([\'addons\']) in the ctor of this generator');
      }
    }
  }, {
    key: 'hasPreprocessor',
    value: function hasPreprocessor(name) {
      try {
        return this.get('preprocessors').map(function (str) {
          return str.toLowerCase();
        }).includes(name.toLowerCase());
      } catch (e) {
        throw new Error('Property \'preprocessors\' is undefined: You should add a\n   this.promptIfMissing([\'preprocessors\']) in the ctor of this generator');
      }
    }
  }, {
    key: 'compute',
    value: function compute(propName) {
      switch (propName) {
        case 'className':
          return (0, _uppercamelcase2.default)(this.get('name'));

        case 'cYear':
          {
            var created = this.get('created').getFullYear();
            var updated = this.get('updated').getFullYear();
            var cYear = created < updated ? created + '-' : '';
            cYear += updated;
            return cYear;
          }

        case 'externalReact':
          return this.has('React') ? '\n    .external(\'react/addons\')\n    .external(\'react/lib/ReactContext\')\n    .external(\'react/lib/ExecutionEnvironment\')' : '';

        case 'fileStem':
          {
            var filestem = this.className[0].toLowerCase() + this.className.substring(1);
            filestem = filestem.replace(/[A-Z]/g, function (s) {
              return '-' + s;
            });
            return (0, _slug2.default)(filestem, { lower: true });
          }

        case 'importBabel':
          return this.has('Babel') ? 'import babel from \'gulp-babel\';\n' : '';

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
  }, {
    key: 'get',
    value: function get(name) {
      return conf.get(name);
    }
  }, {
    key: 'getProps',
    value: function getProps() {
      var _this4 = this;

      var props = conf.getProps();

      _helpers.extendedProps.forEach(function (func) {
        props[func] = _this4[func];
      });

      return props;
    }
  }, {
    key: 'set',
    value: function set(name, value) {
      var props = value === undefined ? name : _defineProperty({}, name, value);

      Object.keys(props).forEach(function (name) {
        conf.set(name, props[name]);
      });

      var _props = Object.assign({}, props);
      delete _props.gulpIncludes; // Global, but recomputed each time
      this.config.set(_props);
    }
  }]);

  return _class;
}(_yeomanGenerator.Base);

exports.default = _class;


_yeomanGenerator.Base.reset = function () {
  if (typeof conf.reset === 'function') {
    conf.reset();
  }
};
module.exports = exports['default'];