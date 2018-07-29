'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Property extends _events2.default {
  constructor(options = {}) {
    const { name, value } = options;

    if (typeof name !== 'string') {
      throw new Error('Property has no name');
    }

    super();

    let _value = value;
    let _prevValue;

    Object.defineProperties(this, {
      value: {
        get() {
          return _value;
        },
        set(value) {
          if (value === undefined) {
            throw new Error(`Argument ${this.name} is missing or undefined`);
          }

          if (value === _prevValue) {
            return;
          }

          _prevValue = _value;
          _value = value;
          this.emit('change', value);
        }
      },

      name: {
        value: name
      }
    });
  }
}
exports.default = Property;
module.exports = exports['default'];