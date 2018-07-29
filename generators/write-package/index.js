'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _base2.default {
  constructor(args, opts) {
    const options = Object.assign({
      generator: 'write-package'
    }, opts);

    super(args, options);

    this.promptIfMissing(['name', 'description', 'author', 'email', 'github', 'license', 'libDir', 'deps', 'devDeps', 'peerDeps', 'version', 'contributors', 'keywords']);
  }

  writing() {
    const props = this.getProps();

    props.main = this.compute('main');
    props.module = this.compute('module');
    props.nodeVersion = this.compute('nodeVersion');
    props.contributors = this.stringify(this.get('contributors'));
    props.keywords = this.stringify(this.get('keywords'));

    this.fs.copyTpl(this.templatePath('package.ejs'), this.destinationPath('package.json'), props);
  }
};
module.exports = exports['default'];