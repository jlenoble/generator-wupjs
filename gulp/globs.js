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

const stemSrcGlob = ["**/*.ts"];

export const srcGlob = join(srcDir, stemSrcGlob);
export const testGlob = join(testDir, stemSrcGlob);

export const testBuildGlob = join(buildDir, "test", "**/*.js");
export const generateGlob = join(generatorsDir, "**/*.js");
export const templateGlob = join(srcDir, "**/templates/*");

export const allSrcGlob = srcGlob.concat(testGlob);
export const allBuildGlob = testBuildGlob;
export const allTestGlob = allBuildGlob.concat(generateGlob);
