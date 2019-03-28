import path from 'path';

const packageVersions = new Map();

export default function getPackageVersion (packageName) {
  if (!packageVersions.has(packageName)) {
    const json = require(path.join(packageName, 'package.json'));
    packageVersions.set(packageName, json.version);
  }

  return packageVersions.get(packageName);
}
