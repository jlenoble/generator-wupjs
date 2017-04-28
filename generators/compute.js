'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeDeps = exports.fullExt = exports.fullDir = undefined;

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

var nodeDeps = function nodeDeps(hint, gen) {
  return (0, _jsonStableStringify2.default)(gen.get(hint), { space: 2 }).replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');
};

exports.fullDir = fullDir;
exports.fullExt = fullExt;
exports.nodeDeps = nodeDeps;