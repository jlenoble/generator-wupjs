import path from "path";

// Tests change running context, so use absolute paths
const cwd = process.cwd();

function join(...args) {
  const len = args.length;
  let glob = args[len - 1];

  if (!Array.isArray(glob)) {
    glob = [glob];
  }

  args.pop();

  return glob.map(str => {
    const dir = path.join(...args);
    return path.join(dir, path.relative(cwd, str));
  });
}

export const srcDir = path.join(cwd, "src");
export const testDir = path.join(cwd, "test");
export const buildDir = path.join(cwd, "build");
export const generatorsDir = path.join(cwd, "generators");

export const apps = ["generator-wupjs"];

const stemSrcGlob = ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"];

export const srcGlob = join(srcDir, stemSrcGlob);
export const testGlob = join(testDir, [
  "**/*.test.js",
  "**/*.test.jsx",
  "**/*.ts",
  "**/*.tsx"
]);
export const allTestGlob = join(testDir, stemSrcGlob);
export const testBuildGlob = join(buildDir, testGlob);
export const generateGlob = join(generatorsDir, stemSrcGlob);
export const templateGlob = join(srcDir, "**/templates/*");

export const allSrcGlob = allTestGlob;
export const allBuildGlob = testBuildGlob.concat(generateGlob);
