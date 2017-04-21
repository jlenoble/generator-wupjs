'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getWriteGenerators = function getWriteGenerators(name) {
  switch (name) {
    case 'updated':case 'created':
      return ['write-license'];

    case 'author':case 'email':case 'license':
      return ['write-license', 'write-package'];

    case 'github':case 'name':case 'description':case 'libDir':
    case 'deps':case 'devDeps':case 'peerDeps':
      return ['write-package'];

    case 'babel':
      return ['write-babelrc', 'write-package'];

    default:
      return [];
  }
};

exports.default = getWriteGenerators;
module.exports = exports['default'];