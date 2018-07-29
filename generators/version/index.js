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
      props: ['version'],
      generator: 'version'
    }, opts);

    super(args, options);
  }

  initializing() {
    if (!this.get('version')) {
      this.set({ version: '0.0.0' });
    }
  }
};
module.exports = exports['default'];