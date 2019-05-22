const upgradeOneToOne = new Map([
  ["babel-core", "@babel/core"],
  ["babel-preset-es2015", "@babel/preset-env"],
  ["babel-preset-es2016", "@babel/preset-env"],
  ["babel-preset-es2017", "@babel/preset-env"],
  ["babel-preset-env", "@babel/preset-env"],
  ["babel-preset-react", "@babel/preset-react"]
]);

const remove = new Set(["gulp-util"]);

export default function upgradePackage(packageName): string | undefined {
  if (upgradeOneToOne.has(packageName)) {
    return upgradeOneToOne.get(packageName);
  }

  if (remove.has(packageName)) {
    return;
  }

  return packageName;
}
