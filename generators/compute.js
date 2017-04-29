'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = exports.rel = exports.nodeDeps = exports.fullPaths = exports.fullExt = exports.fullDir = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsonStableStringify = require('json-stable-stringify');

var _jsonStableStringify2 = _interopRequireDefault(_jsonStableStringify);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pattern = function pattern(pat) {
  return pat === '**' ? '**/*' : '*';
};

var fullDir = function fullDir(_ref, gen) {
  var rel = _ref.rel,
      dir = _ref.dir;

  return dir.split(',').map(function (dir) {
    return rel ? _path2.default.join(rel, gen.dirs(dir + 'Dir')) : gen.dirs(dir + 'Dir');
  });
};

var fullExt = function fullExt(_ref2, gen) {
  var rel = _ref2.rel,
      ext = _ref2.ext,
      dir = _ref2.dir,
      pat = _ref2.pat;

  var _pat = pattern(pat) + '.';

  if (ext) {
    if (/.*js$/.test(ext) && gen.has('React') && rel !== gen.dirs('buildDir', gen)) {
      return [_pat + ext, _pat + ext + 'x'];
    }

    return _pat + ext;
  }

  switch (dir) {
    case 'sass':
      return _pat + 'scss';

    default:
      return _pat + dir;
  }
};

var fullPaths = function fullPaths(pathHint, gen) {
  var _pathHint$split = pathHint.split('#'),
      _pathHint$split2 = _slicedToArray(_pathHint$split, 2),
      rel = _pathHint$split2[0],
      hint = _pathHint$split2[1];

  if (!hint) {
    hint = rel;
    rel = undefined;
  }

  var _hint$split = hint.split(':'),
      _hint$split2 = _slicedToArray(_hint$split, 2),
      dir = _hint$split2[0],
      file = _hint$split2[1];

  dir += 'Dir';

  if (rel) {
    rel += 'Dir';
    return _path2.default.join(gen.dirs(rel), gen.dirs(dir), gen.filenames(file));
  }

  return _path2.default.join(gen.dirs(dir), gen.filenames(file));
};

var nodeDeps = function nodeDeps(hint, gen) {
  return (0, _jsonStableStringify2.default)(gen.get(hint), { space: 2 }).replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');
};

var rel = function rel(hint, gen) {
  var _hint$split3 = hint.split(':'),
      _hint$split4 = _slicedToArray(_hint$split3, 2),
      fromDir = _hint$split4[0],
      toDir = _hint$split4[1];

  fromDir = gen.dirs(fromDir + 'Dir');
  toDir = gen.dirs(toDir + 'Dir');
  return _path2.default.relative(fromDir, toDir);
};

var stringify = function stringify(obj, gen) {
  return (0, _jsonStableStringify2.default)(obj, { space: 2 }).replace(/"/g, '\'');
};

exports.fullDir = fullDir;
exports.fullExt = fullExt;
exports.fullPaths = fullPaths;
exports.nodeDeps = nodeDeps;
exports.rel = rel;
exports.stringify = stringify;