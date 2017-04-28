'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dirs = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dirs = function dirs(dir, gen) {
  switch (dir) {
    case 'cssDir':
      return _path2.default.join(gen.get('buildDir'), 'css');

    case 'nodeDir':case 'sassImportDir':
      return 'node_modules';

    case 'sassDir':
      return _path2.default.join(gen.dirs('staticDir'), 'scss');

    case 'staticDir':
      return _path2.default.join(gen.get('srcDir'), 'static');

    default:
      return gen.get(dir);
  }
};

exports.dirs = dirs;