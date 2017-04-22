'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = joinGlobs;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function joinGlobs() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var len = args.length;

  switch (len) {
    case 0:
      return [];

    case 1:
      {
        var arg = args[0];

        return Array.isArray(arg) ? arg : [arg];
      }

    case 2:
      {
        var arg1 = args[0],
            arg2 = args[1];

        if (Array.isArray(arg1)) {
          return arg1.map(function (arg) {
            return joinGlobs(arg, arg2);
          }).reduce(function (arr1, arr2) {
            return arr1.concat(arr2);
          }, []);
        } else if (Array.isArray(arg2)) {
          return arg2.map(function (arg) {
            return _path2.default.join(arg1, arg);
          });
        } else {
          return [_path2.default.join(arg1, arg2)];
        }
      }

    default:
      {
        var _arg = args[len - 2];
        var _arg2 = args[len - 1];
        args.pop();
        args.pop();
        return joinGlobs.apply(undefined, args.concat([joinGlobs(_arg, _arg2)]));
      }
  }
}
module.exports = exports['default'];