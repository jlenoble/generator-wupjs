'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index');

var extendProps = function extendProps(gen) {
  Object.assign(gen, {
    dirs: function dirs(dir) {
      return (0, _index.dirs)(dir, this);
    }
  });
};

exports.default = extendProps;
module.exports = exports['default'];