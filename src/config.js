import fs from 'fs';
import path from 'path';
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
    const changedProperties = new Map();

    const conf = yoConfig[genName];

    Object.defineProperties(this, {
      has: {
        value: function (name) {
          return properties.has(name);
        },
      },

      get: {
        value: function (name) {
          const property = properties.get(name);
          return property ? property.value : undefined;
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

      set: {
        value: function (name, value) {
          if (!this.has(name)) {
            return;
          }

          const p = properties.get(name);
          p.value = value;
        },
      },

      changedProperties: {
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
