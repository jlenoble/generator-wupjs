import path from 'path';

// Tests change running context, so use absolute paths
const cwd = process.cwd();

function join (...args) {
  let len = args.length;
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

export const srcDir = path.join(cwd, 'src');
export const testDir = path.join(cwd, 'test');
export const buildDir = path.join(cwd, 'build');
export const generatorsDir = path.join(cwd, 'generators');

export const apps = ['generator-wupjs'];

export const srcGlob = join(srcDir, ['**/*.js', '**/*.jsx']);
export const testGlob = join(testDir, ['**/*.test.js', '**/*.test.jsx']);
export const allTestGlob = join(testDir, ['**/*.js', '**/*.jsx']);
export const testBuildGlob = join(buildDir, testGlob);
export const generateGlob = join(generatorsDir, ['**/*.js', '**/*.jsx']);
export const templateGlob = join(srcDir, '**/templates/*');

export const allSrcGlob = allTestGlob;
export const allBuildGlob = testBuildGlob.concat(generateGlob);
