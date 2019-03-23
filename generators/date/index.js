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
      props: ['created', 'updated'],
      generator: 'date'
    }, opts);

    super(args, options);
  }

  initializing() {
    const props = {};
    const created = this.get('created');

    props.updated = new Date();
    props.created = created ? new Date(created) : props.updated;

    this.set(props);
  }
};
module.exports = exports.default;