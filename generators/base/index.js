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

var _jsonStableStringify = require('json-stable-stringify');

var _jsonStableStringify2 = _interopRequireDefault(_jsonStableStringify);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appDir = __dirname;
var conf = new _index.Config();

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
          var genName = (0, _index.getGenerator)(propName);
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

      var generators = (0, _index.getWriteGenerators)(propName);

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
          try {
            return this.get('preprocessors').includes('Compass');
          } catch (e) {
            throw new Error('Property \'preprocessors\' is undefined: You should add a\n     this.promptIfMissing([\'preprocessors\']) in the ctor of this generator');
          }

        case 'enzyme':
          try {
            return this.get('addons').includes('Enzyme');
          } catch (e) {
            throw new Error('Property \'addons\' is undefined: You should add a\n     this.promptIfMissing([\'addons\']) in the ctor of this generator');
          }

        case 'react':
          try {
            return this.get('addons').includes('React');
          } catch (e) {
            throw new Error('Property \'addons\' is undefined: You should add a\n     this.promptIfMissing([\'addons\']) in the ctor of this generator');
          }
      }
    }
  }, {
    key: 'compute',
    value: function compute(propName) {
      switch (propName) {
        case 'allBuildGlob':
          return (0, _jsonStableStringify2.default)((0, _index.joinGlobs)(this.get('buildDir'), [this.get('srcDir'), this.get('testDir')], '**/*.js'), { space: 2 }).replace(/"/g, '\'');

        case 'allSassGlob':
          return (0, _jsonStableStringify2.default)((0, _index.joinGlobs)(this.compute('sassDir'), '**/*.scss'), { space: 2 }).replace(/"/g, '\'');

        case 'allSrcGlob':
          return (0, _jsonStableStringify2.default)((0, _index.joinGlobs)([this.get('srcDir'), this.get('testDir')], this.compute('glob')), { space: 2 }).replace(/"/g, '\'');

        case 'babelPlugins':
          return Object.keys(this.get('devDeps')).filter(function (dep) {
            return dep.match(/babel-plugin/);
          }).map(function (dep) {
            return '"' + dep.replace('babel-plugin-', '') + '"';
          }).join(', ');

        case 'browserMocha':
          return _path2.default.join(_path2.default.relative(this.get('buildDir'), (0, _index.dirs)('nodeDir', this)), 'mocha/mocha.js');

        case 'bsWatchGlob':
          return this.has('Compass') ? (0, _jsonStableStringify2.default)([_path2.default.join((0, _index.dirs)('staticDir', this), 'index.html'), _path2.default.join(this.get('buildDir'), this.compute('bundleName')), _path2.default.join((0, _index.dirs)('cssDir', this), '**/*.scss')], { space: 2 }).replace(/"/g, '\'') : (0, _jsonStableStringify2.default)([_path2.default.join((0, _index.dirs)('staticDir', this), 'index.html'), _path2.default.join(this.get('buildDir'), this.compute('bundleName'))], { space: 2 }).replace(/"/g, '\'');

        case 'bundleName':
          return 'bundle.js';

        case 'bundleRoot':
          return _path2.default.join(this.get('buildDir'), this.get('srcDir'), 'demo.js');

        case 'classFileName':
          return this.compute('fileStem') + '.js';

        case 'className':
          return (0, _uppercamelcase2.default)(this.get('name'));

        case 'classTestFileName':
          return this.compute('fileStem') + '.test.js';

        case 'componentFileName':
          return this.compute('fileStem') + '.jsx';

        case 'componentTestFileName':
          return this.compute('fileStem') + '.test.jsx';

        case 'componentTestText':
          if (this.has('Enzyme')) {
            return 'const wrapper = shallow(\n      <' + this.compute('className') + '/>\n    );\n\n    expect(wrapper.find(\'h1\').text()).to.equal(\'Hello world!\');';
          } else if (this.has('React')) {
            return 'const component = TestUtils.renderIntoDocument(<' + this.compute('className') + '/>);\n    const h1 = TestUtils.findRenderedDOMComponentWithTag(component, \'h1\');\n\n    expect(h1.textContent).to.equal(\'Hello world!\');';
          } else {
            return '';
          }

        case 'cYear':
          {
            var created = this.get('created').getFullYear();
            var updated = this.get('updated').getFullYear();
            var cYear = created < updated ? created + '-' : '';
            cYear += updated;
            return cYear;
          }

        case 'dependencies':
          return (0, _jsonStableStringify2.default)(this.get('deps'), { space: 2 }).replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');

        case 'devDependencies':
          return (0, _jsonStableStringify2.default)(this.get('devDeps'), { space: 2 }).replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');

        case 'ecmaFeatures':
          return (0, _jsonStableStringify2.default)(this.has('React') ? { jsx: true } : {}, { space: 2 }).replace(/\n/g, '\n    ');

        case 'ecmaVersion':
          {
            var babel = this.get('babel');
            switch (babel) {
              case 'es2015':case 'es2016':case 'es2017':
                return babel.substring(2);

              default:
                return 5;
            }
          }

        case 'esLintPlugins':
          return (0, _jsonStableStringify2.default)(this.has('React') ? ['react'] : []);

        case 'esLintRules':
          {
            var rules = {
              'arrow-parens': ['error', 'as-needed'],
              'func-names': ['error', 'never'],
              'indent': ['error', 2],
              'max-len': ['error', { ignoreRegExpLiterals: true }],
              'no-param-reassign': ['error', { props: true }],
              'one-var': ['error', 'never'],
              'quotes': ['error', 'single', { allowTemplateLiterals: true }],
              'require-jsdoc': ['off'],
              'space-before-function-paren': ['error', 'always']
            };

            if (this.has('React')) {
              Object.assign(rules, {
                'react/jsx-uses-react': ['error'],
                'react/jsx-uses-vars': ['error']
              });
            }

            var keys = Object.keys(rules).sort();
            var str = '{';
            keys.forEach(function (key, i) {
              str += '\n    "' + key + '": ' + (0, _jsonStableStringify2.default)(rules[key]).replace(/,/g, ', ').replace(/:/g, ': ') + (i < keys.length - 1 ? ',' : '');
            });
            str += '\n  }';

            return str;
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

        case 'glob':
          return this.has('React') ? ['**/*.js', '**/*.jsx'] : '**/*.js';

        case 'gulpMocha':
          return this.has('React') || this.has('Compass') ? 'gulp-mocha-phantomjs' : 'gulp-mocha';

        case 'gulpMochaCallback':
          return this.has('React') || this.has('Compass') ? 'done' : '()';

        case 'gulpWatchBundles':
          return this.has('React') || this.has('Compass') ? 'gulp.watch(srcBuildGlob, bundle);\n  gulp.watch(allBuildGlob, testBundle);\n' : '';

        case 'gulpWatchSass':
          return this.has('Compass') ? '  gulp.watch(allSassGlob, sass);\n' : '';

        case 'gulpWatchTest':
          return this.has('React') || this.has('Compass') ? '  gulp.watch(testBundleGlob, test);\n' : '  gulp.watch(allBuildGlob, test);\n';

        case 'importBabel':
          return this.has('Babel') ? 'import babel from \'gulp-babel\';\n' : '';

        case 'importBundles':
          return this.has('Compass') || this.has('React') ? 'import {bundle} from \'./bundle\';\nimport {testBundle} from \'./test-bundle\';\n\nconst srcBuildGlob = ' + this.compute('srcBuildGlob') + ';\nconst testBundleGlob = \'' + _path2.default.join(this.get('buildDir'), 'test-bundle.js') + '\';' : '';

        case 'importComponentTestLib':
          if (this.has('Enzyme')) {
            return 'import {shallow} from \'enzyme\';';
          } else if (this.has('React')) {
            return 'import TestUtils from \'react-dom/test-utils\';';
          } else {
            return '';
          }

        case 'importPreTestTask':
          if (this.has('Compass')) {
            return 'import \'' + (this.has('React') ? './test-bundle' : './build') + '\';\nimport \'./sass\';';
          } else {
            return 'import \'' + (this.has('React') ? './test-bundle' : './build') + '\';';
          }

        case 'importSass':
          return '\nimport \'./sass\';';

        case 'importSassFromSass':
          return '\nimport {sass} from \'./sass\';';

        case 'main':
          return _path2.default.join(this.get('libDir'), this.compute('module')) + '.js';

        case 'module':
          return this.get('name').replace(/\s+/g, '-').toLowerCase();

        case 'name':
          return this.appname;

        case 'onMochaEnd':
          return this.has('React') || this.has('Compass') ? '\n    .on(\'end\', done)' : '';

        case 'peerDependencies':
          return (0, _jsonStableStringify2.default)(this.get('peerDeps'), { space: 2 }).replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');

        case 'pipeBabel':
          return this.has('Babel') ? '\n    .pipe(babel())' : '';

        case 'presets':
          {
            var presets = [];

            switch (this.get('babel')) {
              case 'es2017':
                presets.push('es2017');
              // FALL THROUGH

              case 'es2016':
                presets.push('es2016');
              // FALL THROUGH

              case 'es2015':
                presets.push('es2015');
            }

            if (this.has('React')) {
              presets.push('react');
            }

            presets.sort();
            return presets.map(function (preset) {
              return '"' + preset + '"';
            }).join(', ');
          }

        case 'preServeTask':
          return this.has('Compass') ? 'gulp.parallel(\'bundle\', \'sass\')' : '\'bundle\'';

        case 'preTestTask':
          if (this.has('Compass')) {
            return this.has('React') ? 'gulp.parallel(\'test-bundle\', \'sass\')' : 'gulp.parallel(\'build\', \'sass\')';
          } else {
            return '\'' + (this.has('React') ? 'test-bundle' : 'build') + '\'';
          }

        case 'runnerFile':
          return 'runner.html';

        case 'sassCache':
          return this.has('Compass') ? '.sass-cache' : '';

        case 'sassDir':
          return _path2.default.join((0, _index.dirs)('staticDir', this), 'scss');

        case 'sassGlob':
          return (0, _jsonStableStringify2.default)((0, _index.joinGlobs)(this.compute('sassDir'), '*.scss'), { space: 2 }).replace(/"/g, '\'');

        case 'sassImportDir':
          return (0, _index.dirs)('nodeDir', this);

        case 'srcBuildGlob':
          return (0, _jsonStableStringify2.default)((0, _index.joinGlobs)(this.get('buildDir'), this.get('srcDir'), this.compute('glob')), { space: 2 }).replace(/"/g, '\'');

        case 'srcGlob':
          return (0, _jsonStableStringify2.default)((0, _index.joinGlobs)(this.get('srcDir'), this.compute('glob')), { space: 2 }).replace(/"/g, '\'');

        case 'testBundleGlob':
          return _path2.default.join(_path2.default.relative(this.get('testDir'), this.get('buildDir')), this.compute('testBundleName'));

        case 'testBundleName':
          return 'test-bundle.js';

        case 'testBundleRoot':
          return _path2.default.join(this.get('buildDir'), this.get('testDir'), 'index.test.js');

        case 'testGlob':
          return this.has('React') || this.has('Compass') ? '\'' + _path2.default.join(this.get('testDir'), this.compute('runnerFile')) + '\'' : (0, _jsonStableStringify2.default)((0, _index.joinGlobs)(this.get('buildDir'), this.get('testDir'), '**/*.test.js'), { space: 2 }).replace(/"/g, '\'');
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

      props.dirs = function (dir) {
        return (0, _index.dirs)(dir, _this4);
      };

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