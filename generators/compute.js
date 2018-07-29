'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = exports.rel = exports.nodeDeps = exports.indent = exports.fullPaths = exports.fullExt = exports.fullDir = undefined;

var _jsonStableStringify = require('json-stable-stringify');

var _jsonStableStringify2 = _interopRequireDefault(_jsonStableStringify);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pattern = pat => pat === '**' ? '**/*' : '*';

const fullDir = ({ rel, dir }, gen) => {
  return dir.split(',').map(dir => {
    const neg = dir[0] === '!';

    let _dir = neg ? dir.substring(1) : dir;
    _dir = gen.dirs(_dir + 'Dir');

    if (rel) {
      _dir = _path2.default.join(rel, _dir);
    }

    return neg ? '!' + _dir : _dir;
  });
};

const fullExt = ({ rel, ext, dir, pat }, gen) => {
  if (!pat.includes('*')) {
    // Explicit filename, no actual pattern, so just return it
    return pat;
  }

  const _pat = pattern(pat) + '.';

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

const fullPaths = (pathHint, gen) => {
  let [rel, hint] = pathHint.split('#');

  if (!hint) {
    hint = rel;
    rel = undefined;
  }

  let [dir, file] = hint.split(':');
  dir += 'Dir';

  if (rel) {
    rel += 'Dir';
    return _path2.default.join(gen.dirs(rel), gen.dirs(dir), gen.filenames(file));
  }

  return _path2.default.join(gen.dirs(dir), gen.filenames(file));
};

const indent = ([str, n], gen) => {
  const indent = new Array(n);
  indent.fill(' ');
  return str.replace(/\n/g, '\n' + indent.join(''));
};

const nodeDeps = (hint, gen) => {
  return (0, _jsonStableStringify2.default)(gen.get(hint), { space: 2 }).replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');
};

const rel = (hint, gen) => {
  let [fromDir, toDir] = hint.split(':');
  fromDir = gen.dirs(fromDir + 'Dir');
  toDir = gen.dirs(toDir + 'Dir');
  return _path2.default.relative(fromDir, toDir);
};

const stringify = (obj, gen) => {
  if (Array.isArray(obj) && obj.length === 0) {
    return '[]';
  }

  if (Object.keys(obj).length === 0) {
    return '{}';
  }

  return (0, _jsonStableStringify2.default)(obj, { space: 2 }).replace(/"/g, `'`);
};

exports.fullDir = fullDir;
exports.fullExt = fullExt;
exports.fullPaths = fullPaths;
exports.indent = indent;
exports.nodeDeps = nodeDeps;
exports.rel = rel;
exports.stringify = stringify;