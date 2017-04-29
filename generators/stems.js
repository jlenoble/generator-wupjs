'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globs = exports.filepaths = exports.filenames = exports.dirs = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _joinGlobs = require('./join-globs');

var _joinGlobs2 = _interopRequireDefault(_joinGlobs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dirs = function dirs(dir, gen) {
  switch (dir) {
    case 'cssDir':
      return _path2.default.join(gen.dirs('buildDir'), 'css');

    case 'docDir':
      return 'docs';

    case 'examplesDir':
      return _path2.default.join(gen.dirs('docDir'), 'examples');

    case 'nodeDir':case 'sassImportDir':
      return 'node_modules';

    case 'sassDir':
      return _path2.default.join(gen.dirs('staticDir'), 'scss');

    case 'staticDir':
      return _path2.default.join(gen.dirs('srcDir'), 'static');

    default:
      return gen.get(dir);
  }
};

var filenames = function filenames(file, gen) {
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

var filepaths = function filepaths(pathHint, gen) {
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

var globs = function globs(globHint, gen) {
  var _globHint$split = globHint.split('#'),
      _globHint$split2 = _slicedToArray(_globHint$split, 2),
      rel = _globHint$split2[0],
      hint = _globHint$split2[1];

  if (!hint) {
    hint = rel;
    rel = undefined;
  }

  var _hint$split = hint.split(':'),
      _hint$split2 = _slicedToArray(_hint$split, 3),
      dir = _hint$split2[0],
      pat = _hint$split2[1],
      ext = _hint$split2[2];

  var hints = { rel: rel, dir: dir, pat: pat, ext: ext };

  return gen.stringify((0, _joinGlobs2.default)(gen.fullDir(hints), gen.fullExt(hints)));
};

exports.dirs = dirs;
exports.filenames = filenames;
exports.filepaths = filepaths;
exports.globs = globs;