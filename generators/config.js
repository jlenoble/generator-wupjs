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

const genName = 'generator-wupjs';

class Config extends _events2.default {
  initialize() {
    if (this.isInitialized) {
      return;
    }

    const appDir = process.cwd();
    const yoRcJson = _path2.default.join(appDir, '.yo-rc.json');

    let yoConfig;

    try {
      yoConfig = JSON.parse(_fs2.default.readFileSync(yoRcJson, 'utf8'));
    } catch (e) {
      yoConfig = { [genName]: {} };
    }

    const properties = new Map();
    const generators = new Map();

    const conf = yoConfig[genName];

    Object.defineProperties(this, {
      isInitialized: {
        value: true
      },

      has: {
        value: function (name) {
          return properties.has(name);
        }
      },

      hasGen: {
        value: function (name) {
          return generators.has(name);
        }
      },

      get: {
        value: function (name) {
          let prop = properties.get(name);

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
        value: function () {
          const props = {};

          properties.forEach(({ name, value }) => {
            props[name] = value;
          });

          return props;
        }
      },

      add: {
        value: function (name, value) {
          if (this.has(name)) {
            this.set(name, value);
            return;
          }

          const p = new _property2.default({ name, value });

          p.on('change', () => {
            this.emit('change', p.name);
          });

          properties.set(name, p);
        }
      },

      addGen: {
        value: function (name) {
          generators.set(name, true);
        }
      },

      set: {
        value: function (name, value) {
          if (!this.has(name)) {
            return;
          }

          const p = properties.get(name);
          p.value = value;
        }
      },

      reset: {
        value: function () {
          this.removeAllListeners();

          properties.clear();
          generators.clear();

          Object.keys(conf).forEach(name => {
            this.add(name, conf[name]);
          });
        }
      }
    });

    Object.keys(conf).forEach(name => {
      this.add(name, conf[name]);
    });
  }
}
exports.default = Config;
module.exports = exports.default;