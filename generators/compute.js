'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeDeps = undefined;

var _jsonStableStringify = require('json-stable-stringify');

var _jsonStableStringify2 = _interopRequireDefault(_jsonStableStringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeDeps = function nodeDeps(hint, gen) {
  return (0, _jsonStableStringify2.default)(gen.get(hint), { space: 2 }).replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');
};

exports.nodeDeps = nodeDeps;