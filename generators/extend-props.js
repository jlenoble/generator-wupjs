'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendedProps = undefined;

var _index = require('./index');

var extendProps = function extendProps(gen) {
  Object.assign(gen, {
    dirs: function dirs(dir) {
      return (0, _index.dirs)(dir, gen);
    }
  });
};

exports.default = extendProps;
var extendedProps = exports.extendedProps = ['dirs'];