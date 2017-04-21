'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getGenerator = function getGenerator(name) {
  switch (name) {
    case 'addons':
      return 'addons';

    case 'babel':
      return 'babel';

    case 'created':case 'updated':
      return 'date';

    case 'deps':case 'devDeps':case 'peerDeps':
      return 'deps';

    case 'github':
      return 'github';

    case 'gulpIncludes':
      return 'write-gulpfile';

    case 'license':
      return 'license';

    case 'linters':
      return 'lint';

    case 'name':case 'description':
      return 'module';

    case 'srcDir':case 'testDir':case 'buildDir':case 'libDir':case 'gulpDir':
      return 'paths';

    case 'testRunners':
      return 'test';

    case 'author':case 'email':
      return 'who';
  }
};

exports.default = getGenerator;
module.exports = exports['default'];