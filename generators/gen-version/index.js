'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appDir = __dirname;
const packageJson = _path2.default.join(appDir, '../../package.json');

exports.default = class extends _base2.default {
  constructor(args, opts) {
    const options = Object.assign({
      props: ['genVersion'],
      generator: 'gen-version'
    }, opts);

    super(args, options);
  }

  initializing() {
    const props = {};
    const genVersion = this.fs.readJSON(packageJson, {}).version;

    props.genVersion = genVersion;

    this.set(props);
  }
};
module.exports = exports.default;