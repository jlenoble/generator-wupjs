'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendedProps = undefined;

var _compute = require('./compute');

var _stems = require('./stems');

const makeMethod = (fn, gen) => function (arg) {
  return fn(arg, gen);
};

const funcs = [_stems.dirs, _stems.filenames, _stems.filepaths, _compute.fullDir, _compute.fullExt, _compute.fullPaths, _compute.indent, _stems.globs, _compute.nodeDeps, _compute.rel, _compute.stringify];

const extendedProps = exports.extendedProps = funcs.map(fn => fn.name);

const extendProps = gen => {
  funcs.forEach(fn => {
    Object.assign(gen, { [fn.name]: makeMethod(fn, gen) });
  });
};

exports.default = extendProps;