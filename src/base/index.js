import {Base} from 'yeoman-generator';
import path from 'path';
import slug from 'slug';
import upperCamelCase from 'uppercamelcase';
import stringify from 'json-stable-stringify';
import {Config, getGenerator, getWriteGenerators, joinGlobs,
  extendProps} from '../index';

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
      try {
        return this.get('preprocessors').includes('Compass');
      } catch (e) {
        throw new Error(
          `Property 'preprocessors' is undefined: You should add a
     this.promptIfMissing(['preprocessors']) in the ctor of this generator`);
      }

    case 'enzyme':
      try {
        return this.get('addons').includes('Enzyme');
      } catch (e) {
        throw new Error(
          `Property 'addons' is undefined: You should add a
     this.promptIfMissing(['addons']) in the ctor of this generator`);
      }

    case 'react':
      try {
        return this.get('addons').includes('React');
      } catch (e) {
        throw new Error(
          `Property 'addons' is undefined: You should add a
     this.promptIfMissing(['addons']) in the ctor of this generator`);
      }
    }
  }

  compute (propName) {
    switch (propName) {
    case 'allBuildGlob':
      return stringify(joinGlobs(this.get('buildDir'), [this.get('srcDir'),
        this.get('testDir')], '**/*.js'), {space: 2}).replace(/"/g, `'`);

    case 'allSassGlob':
      return stringify(joinGlobs(this.compute('sassDir'), '**/*.scss'),
        {space: 2}).replace(/"/g, `'`);

    case 'allSrcGlob':
      return stringify(joinGlobs([this.get('srcDir'), this.get('testDir')],
        this.compute('glob')), {space: 2}).replace(/"/g, `'`);

    case 'babelPlugins':
      return Object.keys(this.get('devDeps')).filter(dep => {
        return dep.match(/babel-plugin/);
      }).map(dep => '"' + dep.replace('babel-plugin-', '') + '"').join(', ');

    case 'browserMocha':
      return path.join(path.relative(this.get('buildDir'),
        this.dirs('nodeDir')), 'mocha/mocha.js');

    case 'bsWatchGlob':
      return this.has('Compass') ?
        stringify([path.join(this.dirs('staticDir'), 'index.html'),
          path.join(this.get('buildDir'), this.compute('bundleName')),
          path.join(this.dirs('cssDir'), '**/*.scss')],
          {space: 2}).replace(/"/g, `'`) :
        stringify([path.join(this.dirs('staticDir'), 'index.html'),
          path.join(this.get('buildDir'), this.compute('bundleName'))],
          {space: 2}).replace(/"/g, `'`);

    case 'bundleName':
      return 'bundle.js';

    case 'bundleRoot':
      return path.join(this.get('buildDir'), this.get('srcDir'),
        'demo.js');

    case 'classFileName':
      return this.compute('fileStem') + '.js';

    case 'className':
      return upperCamelCase(this.get('name'));

    case 'classTestFileName':
      return this.compute('fileStem') + '.test.js';

    case 'componentFileName':
      return this.compute('fileStem') + '.jsx';

    case 'componentTestFileName':
      return this.compute('fileStem') + '.test.jsx';

    case 'componentTestText':
      if (this.has('Enzyme')) {
        return `const wrapper = shallow(
      <${this.compute('className')}/>
    );

    expect(wrapper.find('h1').text()).to.equal('Hello world!');`;
      } else if (this.has('React')) {
        return `const component = TestUtils.renderIntoDocument(<${
          this.compute('className')}/>);
    const h1 = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');

    expect(h1.textContent).to.equal('Hello world!');`;
      } else {
        return '';
      }

    case 'cYear':
      {
        const created = this.get('created').getFullYear();
        const updated = this.get('updated').getFullYear();
        let cYear = created < updated ? created + '-' : '';
        cYear += updated;
        return cYear;
      }

    case 'dependencies':
      return stringify(this.get('deps'), {space: 2})
      .replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');

    case 'devDependencies':
      return stringify(this.get('devDeps'), {space: 2})
      .replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');

    case 'ecmaFeatures':
      return stringify(this.has('React') ? {jsx: true} : {}, {space: 2})
      .replace(/\n/g, '\n    ');

    case 'ecmaVersion':
      {
        const babel = this.get('babel');
        switch (babel) {
        case 'es2015': case 'es2016': case 'es2017':
          return babel.substring(2);

        default:
          return 5;
        }
      }

    case 'esLintPlugins':
      return stringify(this.has('React') ? ['react'] : []);

    case 'esLintRules':
      {
        const rules = {
          'arrow-parens': ['error', 'as-needed'],
          'func-names': ['error', 'never'],
          'indent': ['error', 2],
          'max-len': ['error', {ignoreRegExpLiterals: true}],
          'no-param-reassign': ['error', {props: true}],
          'one-var': ['error', 'never'],
          'quotes': ['error', 'single', {allowTemplateLiterals: true}],
          'require-jsdoc': ['off'],
          'space-before-function-paren': ['error', 'always'],
        };

        if (this.has('React')) {
          Object.assign(rules, {
            'react/jsx-uses-react': ['error'],
            'react/jsx-uses-vars': ['error'],
          });
        }

        const keys = Object.keys(rules).sort();
        let str = '{';
        keys.forEach((key, i) => {
          str += '\n    "' + key + '": ' + stringify(rules[key])
            .replace(/,/g, ', ').replace(/:/g, ': ') + (i < keys.length - 1 ?
            ',' : '');
        });
        str += '\n  }';

        return str;
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

    case 'glob':
      return this.has('React') ? ['**/*.js', '**/*.jsx'] : '**/*.js';

    case 'gulpMocha':
      return this.has('React') || this.has('Compass') ? 'gulp-mocha-phantomjs' :
        'gulp-mocha';

    case 'gulpMochaCallback':
      return this.has('React') || this.has('Compass') ? 'done' : '()';

    case 'gulpWatchBundles':
      return this.has('React') || this.has('Compass') ?
        `gulp.watch(srcBuildGlob, bundle);
  gulp.watch(allBuildGlob, testBundle);\n` : '';

    case 'gulpWatchSass':
      return this.has('Compass') ?
        `  gulp.watch(allSassGlob, sass);\n` : '';

    case 'gulpWatchTest':
      return this.has('React') || this.has('Compass') ?
        `  gulp.watch(testBundleGlob, test);\n` :
        `  gulp.watch(allBuildGlob, test);\n`;

    case 'importBabel':
      return this.has('Babel') ? `import babel from 'gulp-babel';\n` : '';

    case 'importBundles':
      return this.has('Compass') || this.has('React') ?
        `import {bundle} from './bundle';
import {testBundle} from './test-bundle';

const srcBuildGlob = ${this.compute('srcBuildGlob')};
const testBundleGlob = '${path.join(this.get('buildDir'),
  'test-bundle.js')}';` : '';

    case 'importComponentTestLib':
      if (this.has('Enzyme')) {
        return `import {shallow} from 'enzyme';`;
      } else if (this.has('React')) {
        return `import TestUtils from 'react-dom/test-utils';`;
      } else {
        return '';
      }

    case 'importPreTestTask':
      if (this.has('Compass')) {
        return `import '${this.has('React') ? './test-bundle' : './build'}';
import './sass';`;
      } else {
        return `import '${this.has('React') ? './test-bundle' : './build'}';`;
      }

    case 'importSass':
      return `\nimport './sass';`;

    case 'importSassFromSass':
      return `\nimport {sass} from './sass';`;

    case 'main':
      return path.join(this.get('libDir'), this.compute('module')) + '.js';

    case 'module':
      return this.get('name').replace(/\s+/g, '-').toLowerCase();

    case 'name':
      return this.appname;

    case 'onMochaEnd':
      return this.has('React') || this.has('Compass') ? `
    .on('end', done)` : '';

    case 'peerDependencies':
      return stringify(this.get('peerDeps'), {space: 2})
      .replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');

    case 'pipeBabel':
      return this.has('Babel') ? '\n    .pipe(babel())' : '';

    case 'presets':
      {
        const presets = [];

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
        return presets.map(preset => `"${preset}"`).join(', ');
      }

    case 'preServeTask':
      return this.has('Compass') ? `gulp.parallel('bundle', 'sass')` :
        `'bundle'`;

    case 'preTestTask':
      if (this.has('Compass')) {
        return this.has('React') ? `gulp.parallel('test-bundle', 'sass')` :
          `gulp.parallel('build', 'sass')`;
      } else {
        return `'${this.has('React') ? 'test-bundle' : 'build'}'`;
      }

    case 'runnerFile':
      return 'runner.html';

    case 'sassCache':
      return this.has('Compass') ? '.sass-cache' : '';

    case 'sassDir':
      return path.join(this.dirs('staticDir'), 'scss');

    case 'sassGlob':
      return stringify(joinGlobs(this.compute('sassDir'), '*.scss'),
        {space: 2}).replace(/"/g, `'`);

    case 'sassImportDir':
      return this.dirs('nodeDir');

    case 'srcBuildGlob':
      return stringify(joinGlobs(this.get('buildDir'), this.get('srcDir'),
        this.compute('glob')), {space: 2}).replace(/"/g, `'`);

    case 'srcGlob':
      return stringify(joinGlobs(this.get('srcDir'), this.compute('glob')),
        {space: 2}).replace(/"/g, `'`);

    case 'testBundleGlob':
      return path.join(path.relative(this.get('testDir'),
        this.get('buildDir')), this.compute('testBundleName'));

    case 'testBundleName':
      return 'test-bundle.js';

    case 'testBundleRoot':
      return path.join(this.get('buildDir'), this.get('testDir'),
        'index.test.js');

    case 'testGlob':
      return this.has('React') || this.has('Compass' ) ?
        `'${path.join(this.get('testDir'), this.compute('runnerFile'))}'` :
        stringify(joinGlobs(this.get('buildDir'), this.get('testDir'),
        '**/*.test.js'), {space: 2}).replace(/"/g, `'`);
    }
  }

  get (name) {
    return conf.get(name);
  }

  getProps () {
    const props = conf.getProps();

    props.dirs = dir => this.dirs(dir);

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
