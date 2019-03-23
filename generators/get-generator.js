'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const getGenerator = name => {
  switch (name) {
    case 'addons':
      return 'addons';

    case 'babel':
      return 'babel';

    case 'contributors':
      return 'contributors';

    case 'created':case 'updated':
      return 'date';

    case 'deps':case 'devDeps':case 'peerDeps':
      return 'deps';

    case 'github':
      return 'github';

    case 'grammar':case 'parsers':case 'listener':case 'visitor':case 'rule':
      return 'parser';

    case 'gulpIncludes':
      return 'write-gulpfile';

    case 'keywords':
      return 'keywords';

    case 'license':
      return 'license';

    case 'linters':
      return 'lint';

    case 'name':case 'description':
      return 'module';

    case 'srcDir':case 'testDir':case 'buildDir':case 'libDir':case 'gulpDir':
      return 'paths';

    case 'preprocessors':
      return 'preprocessors';

    case 'testRunners':
      return 'test';

    case 'version':
      return 'version';

    case 'author':case 'email':
      return 'who';
  }
};

exports.default = getGenerator;
module.exports = exports.default;