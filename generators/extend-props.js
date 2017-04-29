'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendedProps = undefined;

var _compute = require('./compute');

var _stems = require('./stems');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var makeMethod = function makeMethod(fn, gen) {
  return function (arg) {
    return fn(arg, gen);
  };
};

var funcs = [_stems.dirs, _stems.filenames, _stems.filepaths, _compute.fullDir, _compute.fullExt, _compute.fullPaths, _stems.globs, _compute.nodeDeps, _compute.stringify];

var extendedProps = exports.extendedProps = funcs.map(function (fn) {
  return fn.name;
});

var extendProps = function extendProps(gen) {
  funcs.forEach(function (fn) {
    Object.assign(gen, _defineProperty({}, fn.name, makeMethod(fn, gen)));
  });
};

exports.default = extendProps;