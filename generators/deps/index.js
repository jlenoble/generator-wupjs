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
      props: ['deps', 'devDeps', 'peerDeps'],
      generator: 'deps'
    }, opts);

    super(args, options);
  }

  initializing() {
    const deps = this.get('deps') || {};
    const devDeps = this.get('devDeps') || {};
    const peerDeps = this.get('peerDeps') || {};

    this.set({ deps, devDeps, peerDeps });
  }
};
module.exports = exports['default'];