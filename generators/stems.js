'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globs = exports.dirs = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsonStableStringify = require('json-stable-stringify');

var _jsonStableStringify2 = _interopRequireDefault(_jsonStableStringify);

var _joinGlobs = require('./join-globs');

var _joinGlobs2 = _interopRequireDefault(_joinGlobs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dirs = function dirs(dir, gen) {
  switch (dir) {
    case 'cssDir':
      return _path2.default.join(gen.dirs('buildDir'), 'css');

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

var fullDir = function fullDir(dir, gen) {
  return gen.dirs(dir + 'Dir');
};

var pattern = function pattern(pat) {
  return pat === '**' ? '**/*' : '*';
};

var fullExt = function fullExt(_ref, gen) {
  var ext = _ref.ext,
      dir = _ref.dir,
      pat = _ref.pat;

  var _pat = pattern(pat) + '.';

  if (ext) {
    if (/js$/.test(ext) && gen.has('React')) {
      return [_pat + ext, _pat + 'jsx'];
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

var globs = function globs(globHint, gen) {
  var _globHint$match = globHint.match(/(\w+):(\*+):?(.*)/),
      _globHint$match2 = _slicedToArray(_globHint$match, 4),
      dir = _globHint$match2[1],
      pat = _globHint$match2[2],
      ext = _globHint$match2[3];

  return (0, _jsonStableStringify2.default)((0, _joinGlobs2.default)(fullDir(dir, gen), fullExt({ dir: dir, ext: ext, pat: pat }, gen)), { space: 2 }).replace(/"/g, '\'');
};

exports.dirs = dirs;
exports.globs = globs;