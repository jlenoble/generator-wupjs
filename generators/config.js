'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _property = require('./property');

var _property2 = _interopRequireDefault(_property);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var genName = 'generator-wupjs';

var Config = function (_EventEmitter) {
  _inherits(Config, _EventEmitter);

  function Config() {
    _classCallCheck(this, Config);

    var _this = _possibleConstructorReturn(this, (Config.__proto__ || Object.getPrototypeOf(Config)).call(this));

    var appDir = process.cwd();
    var yoRcJson = _path2.default.join(appDir, '.yo-rc.json');

    var yoConfig = void 0;

    try {
      yoConfig = JSON.parse(_fs2.default.readFileSync(yoRcJson, 'utf8'));
    } catch (e) {
      yoConfig = _defineProperty({}, genName, {});
    }

    var properties = new Map();
    var generators = new Map();

    var conf = yoConfig[genName];

    Object.defineProperties(_this, {
      has: {
        value: function value(name) {
          return properties.has(name);
        }
      },

      hasGen: {
        value: function value(name) {
          return generators.has(name);
        }
      },

      get: {
        value: function value(name) {
          var prop = properties.get(name);

          if ((prop === undefined || prop.value === undefined) && _config2.default.has(name)) {
            prop = _config2.default.get(name);

            if (prop !== undefined) {
              this.add(name, prop);
              prop = properties.get(name);
            }
          }

          return prop ? prop.value : undefined;
        }
      },

      getProps: {
        value: function value() {
          var props = {};

          properties.forEach(function (_ref) {
            var name = _ref.name,
                value = _ref.value;

            props[name] = value;
          });

          return props;
        }
      },

      add: {
        value: function value(name, _value) {
          var _this2 = this;

          if (this.has(name)) {
            this.set(name, _value);
            return;
          }

          var p = new _property2.default({ name: name, value: _value });

          p.on('change', function () {
            _this2.emit('change', p.name);
          });

          properties.set(name, p);
        }
      },

      addGen: {
        value: function value(name) {
          generators.set(name, true);
        }
      },

      set: {
        value: function value(name, _value2) {
          if (!this.has(name)) {
            return;
          }

          var p = properties.get(name);
          p.value = _value2;
        }
      },

      reset: {
        value: function value() {
          var _this3 = this;

          this.removeAllListeners();

          properties.clear();
          generators.clear();

          Object.keys(conf).forEach(function (name) {
            _this3.add(name, conf[name]);
          });
        }
      }
    });

    Object.keys(conf).forEach(function (name) {
      _this.add(name, conf[name]);
    });
    return _this;
  }

  return Config;
}(_events2.default);

exports.default = Config;
module.exports = exports['default'];