'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPackageVersion;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const packageVersions = new Map();

function getPackageVersion(packageName) {
  if (!packageVersions.has(packageName)) {
    try {
      const json = require(_path2.default.join(packageName, 'package.json'));
      packageVersions.set(packageName, json.version);
    } catch (e) {
      throw new Error(`Install ${packageName}: npm i --save-dev ${packageName}`);
    }
  }

  return packageVersions.get(packageName);
}
module.exports = exports.default;