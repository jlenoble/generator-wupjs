'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Property = function (_EventEmitter) {
  _inherits(Property, _EventEmitter);

  function Property() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Property);

    var name = options.name,
        value = options.value;


    if (typeof name !== 'string') {
      throw new Error('Property has no name');
    }

    var _this = _possibleConstructorReturn(this, (Property.__proto__ || Object.getPrototypeOf(Property)).call(this));

    var _value = value;
    var _prevValue = void 0;

    Object.defineProperties(_this, {
      value: {
        get: function get() {
          return _value;
        },
        set: function set(value) {
          if (value === undefined) {
            throw new Error('Argument is missing or undefined');
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
    return _this;
  }

  return Property;
}(_events2.default);

exports.default = Property;
module.exports = exports['default'];