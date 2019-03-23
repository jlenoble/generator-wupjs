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
      generator: 'write-license'
    }, opts);

    super(args, options);

    this.promptIfMissing(['author', 'email', 'license', 'created', 'updated']);
  }

  writing() {
    const props = this.getProps();
    props.cYear = this.compute('cYear');

    this.fs.copyTpl(this.templatePath('LICENSE_' + props.license), this.destinationPath('LICENSE'), props);
  }
};
module.exports = exports.default;