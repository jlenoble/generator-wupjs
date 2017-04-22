'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = join;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function join() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var len = args.length;
  var glob = args[len - 1];

  if (!Array.isArray(glob)) {
    glob = [glob];
  }

  args.pop();

  return glob.map(function (str) {
    return _path2.default.join.apply(_path2.default, args.concat([str]));
  });
}
module.exports = exports['default'];