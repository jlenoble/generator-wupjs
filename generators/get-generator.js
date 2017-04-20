'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getGenerator = function getGenerator(name) {
  switch (name) {
    case 'babel':
      return 'babel';

    case 'created':case 'updated':
      return 'date';

    case 'deps':case 'devDeps':case 'peerDeps':
      return 'deps';

    case 'github':
      return 'github';

    case 'license':
      return 'license';

    case 'name':case 'description':
      return 'module';

    case 'srcDir':case 'testDir':case 'buildDir':case 'libDir':case 'gulpDir':
      return 'paths';

    case 'author':case 'email':
      return 'who';
  }
};

exports.default = getGenerator;
module.exports = exports['default'];