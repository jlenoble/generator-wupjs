import path from 'path';

const packageVersions = new Map();

export default function getPackageVersion (packageName) {
  if (!packageVersions.has(packageName)) {
    try {
      const json = require(path.join(packageName, 'package.json'));
      packageVersions.set(packageName, json.version);
    } catch (e) {
      throw new Error(`Install ${
        packageName}: npm i --save-dev ${packageName}`);
    }
  }

  return packageVersions.get(packageName);
}
