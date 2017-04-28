'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deps = undefined;

var _jsonStableStringify = require('json-stable-stringify');

var _jsonStableStringify2 = _interopRequireDefault(_jsonStableStringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deps = function deps(hint, gen) {
  return (0, _jsonStableStringify2.default)(gen.get(hint), { space: 2 }).replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');
};

exports.deps = deps;