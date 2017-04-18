'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _property = require('./property');

var _property2 = _interopRequireDefault(_property);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var genName = 'generator-wupjs';

var Config = function Config() {
  var _this = this;

  _classCallCheck(this, Config);

  var appDir = process.cwd();
  var yoRcJson = _path2.default.join(appDir, '.yo-rc.json');

  var yoConfig = void 0;

  try {
    yoConfig = JSON.parse(_fs2.default.readFileSync(yoRcJson, 'utf8'));
  } catch (e) {
    yoConfig = _defineProperty({}, genName, {});
  }

  var properties = new Map();
  var changedProperties = new Map();
  var promptedProperties = new Map();

  var conf = yoConfig[genName];

  Object.defineProperties(this, {
    has: {
      value: function value(name) {
        return properties.has(name);
      }
    },

    get: {
      value: function value(name) {
        var property = properties.get(name);
        return property ? property.value : undefined;
      }
    },

    prompt: {
      value: function value(name) {
        if (!this.has(name)) {
          return;
        }
        properties.get(name).emit('prompt');
      }
    },

    add: {
      value: function value(name, _value) {
        if (this.has(name)) {
          this.set(name, _value);
          return;
        }

        var p = new _property2.default({ name: name, value: _value });

        p.on('change', function () {
          changedProperties.set(p, p.name);
        });
        p.on('prompt', function () {
          promptedProperties.set(p, p.name);
        });

        if (_value === undefined) {
          p.emit('prompt');
        }

        properties.set(name, p);
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
        properties.clear();
        changedProperties.clear();
        promptedProperties.clear();
      }
    },

    changedProperties: {
      // depending files require writing
      get: function get() {
        return [].concat(_toConsumableArray(changedProperties)).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              obj = _ref2[0],
              name = _ref2[1];

          return name;
        });
      }
    },

    promptedProperties: {
      // props require prompting
      get: function get() {
        return [].concat(_toConsumableArray(promptedProperties)).map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              obj = _ref4[0],
              name = _ref4[1];

          return name;
        });
      }
    }
  });

  Object.keys(conf).forEach(function (name) {
    _this.add(name, conf[name]);
  });
};

exports.default = Config;
module.exports = exports['default'];