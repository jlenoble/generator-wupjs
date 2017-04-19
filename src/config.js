import fs from 'fs';
import path from 'path';
import config from 'config';
import Property from './property';

const genName = 'generator-wupjs';

export default class Config {
  constructor () {
    const appDir = process.cwd();
    const yoRcJson = path.join(appDir, '.yo-rc.json');

    let yoConfig;

    try {
      yoConfig = JSON.parse(fs.readFileSync(yoRcJson, 'utf8'));
    } catch (e) {
      yoConfig = {[genName]: {}};
    }

    const properties = new Map();
    const generators = new Map();
    const changedProperties = new Map();

    const conf = yoConfig[genName];

    Object.defineProperties(this, {
      has: {
        value: function (name) {
          return properties.has(name);
        },
      },

      hasGen: {
        value: function (name) {
          return generators.has(name);
        },
      },

      get: {
        value: function (name) {
          let prop = properties.get(name);

          if ((prop === undefined || prop.value === undefined)
            && config.has(name)) {
            prop = config.get(name);

            if (prop !== undefined) {
              this.add(name, prop);
              prop = properties.get(name);
            }
          }

          return prop ? prop.value: undefined;
        },
      },

      getProps: {
        value: function () {
          const props = {};

          properties.forEach(({name, value}) => {
            props[name] = value;
          });

          return props;
        },
      },

      add: {
        value: function (name, value) {
          if (this.has(name)) {
            this.set(name, value);
            return;
          }

          const p = new Property({name, value});

          p.on('change', () => {
            changedProperties.set(p, p.name);
          });

          properties.set(name, p);
        },
      },

      addGen: {
        value: function (name) {
          generators.set(name, true);
        },
      },

      set: {
        value: function (name, value) {
          if (!this.has(name)) {
            return;
          }

          const p = properties.get(name);
          p.value = value;
        },
      },

      reset: {
        value: function () {
          properties.clear();
          generators.clear();
          changedProperties.clear();
        },
      },

      changedProperties: { // depending files require writing
        get () {
          return [...changedProperties].map(([obj, name]) => name);
        },
      },
    });

    Object.keys(conf).forEach(name => {
      this.add(name, conf[name]);
    });
  }
}
