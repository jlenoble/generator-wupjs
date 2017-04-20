'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getGenerator = function getGenerator(name) {
  switch (name) {
    case 'created':case 'updated':
      return 'date';

    case 'author':case 'email':
      return 'who';

    case 'github':
      return 'github';

    case 'license':
      return 'license';

    case 'name':case 'description':
      return 'module';

    case 'deps':case 'devDeps':case 'peerDeps':
      return 'deps';
  }
};

exports.default = getGenerator;
module.exports = exports['default'];