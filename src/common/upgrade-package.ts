import RefDeps from "./ref-deps";

const upgradeOneToOne = new Map([
  ["babel-core", "@babel/core"],
  ["babel-preset-es2015", "@babel/preset-env"],
  ["babel-preset-es2016", "@babel/preset-env"],
  ["babel-preset-es2017", "@babel/preset-env"],
  ["babel-preset-env", "@babel/preset-env"],
  ["babel-preset-react", "@babel/preset-react"]
]);

export default function upgradePackage(
  packageName: string,
  refDeps: RefDeps
): string | undefined {
  if (upgradeOneToOne.has(packageName)) {
    return upgradeOneToOne.get(packageName);
  }

  if (refDeps.isDeprecated(packageName)) {
    return;
  }

  return packageName;
}
