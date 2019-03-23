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
      generator: 'write-src'
    }, opts);

    super(args, options);

    this.promptIfMissing(['addons']);
  }

  configuring() {
    if (this.has('React')) {
      this.composeWith('component');
    } else {
      this.composeWith('class');
    }
  }
};
module.exports = exports.default;