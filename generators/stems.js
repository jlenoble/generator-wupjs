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
    case 'staticDir':
      return _path2.default.join(gen.get('srcDir'), 'static');
  }
};

exports.dirs = dirs;