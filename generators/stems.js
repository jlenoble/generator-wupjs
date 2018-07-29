'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globs = exports.filepaths = exports.filenames = exports.dirs = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _joinGlobs = require('./join-globs');

var _joinGlobs2 = _interopRequireDefault(_joinGlobs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dirs = (dir, gen) => {
  switch (dir) {
    case 'cssDir':
      return _path2.default.join(gen.dirs('buildDir'), 'css');

    case 'dataDir':
      return _path2.default.join(gen.dirs('staticDir'), 'data');

    case 'docDir':
      return 'docs';

    case 'examplesDir':
      return _path2.default.join(gen.dirs('docDir'), 'examples');

    case 'grammarDir':
      return _path2.default.join(gen.dirs('listenerDir'), 'grammars');

    case 'gulpfilesDir':
      return _path2.default.join(gen.dirs('testDir'), 'gulpfiles');

    case 'listenerDir':
      return _path2.default.join(gen.dirs('staticDir'), 'antlr4');

    case 'nodeDir':case 'sassImportDir':
      return 'node_modules';

    case 'parserDir':
      return _path2.default.join(gen.dirs('listenerDir'), 'parsers');

    case 'sassDir':
      return _path2.default.join(gen.dirs('staticDir'), 'scss');

    case 'sourcesDir':
      return _path2.default.join(gen.dirs('testDir'), 'sources');

    case 'staticDir':
      return _path2.default.join(gen.dirs('srcDir'), 'static');

    case 'visitorDir':
      return _path2.default.join(gen.dirs('staticDir'), 'antlr4');

    default:
      return gen.get(dir);
  }
};

const filenames = (file, gen) => {
  switch (file) {
    case 'bundleRoot':
      return 'demo.js';

    case 'testBundleRoot':
      return 'index.test.js';

    case 'bundle':
      return 'bundle.js';

    case 'testBundle':
      return 'test-bundle.js';

    case 'indexPage':
      return 'index.html';

    case 'runnerPage':
      return 'runner.html';

    case 'docConf':
      return 'markdown.json';
  }
};

const filepaths = (pathHint, gen) => {
  switch (pathHint) {
    case 'bundleRoot':
      return gen.fullPaths('build#src:bundleRoot');

    case 'testBundleRoot':
      return gen.fullPaths('build#test:testBundleRoot');

    case 'testBundle':
      return gen.fullPaths('build:testBundle');

    case 'indexPage':
      return gen.fullPaths('static:indexPage');

    case 'runnerPage':
      return gen.fullPaths('test:runnerPage');

    case 'docConf':
      return gen.filenames('docConf');
  }
};

const globs = (_globHint, gen) => {
  let globHint = Array.isArray(_globHint) ? _globHint : [_globHint];

  globHint = globHint.map(globHint => {
    let [rel, hint] = globHint.split('#');
    if (!hint) {
      hint = rel;
      rel = undefined;
    }
    const [dir, pat, ext] = hint.split(':');
    const hints = { rel, dir, pat, ext };

    return (0, _joinGlobs2.default)(gen.fullDir(hints), gen.fullExt(hints));
  }).reduce((arr1, arr2) => arr1.concat(arr2), []);

  const hints = new Set(globHint);
  return gen.stringify([...hints]);
};

exports.dirs = dirs;
exports.filenames = filenames;
exports.filepaths = filepaths;
exports.globs = globs;