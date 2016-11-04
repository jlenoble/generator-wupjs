import path from 'path';

// Tests change running context, so use absolute paths
const cwd = process.cwd();

function join(...args) {
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

export const testDir = path.join(cwd, 'test');
export const buildDir = path.join(cwd, 'build');

export const apps = ['generator-wupjs'];

export const testGlob = join(testDir, ['**/*.test.js', '**/*.test.jsx']);
export const testBuildGlob = join(buildDir, testGlob);

export const allSrcGlob = testGlob;
export const allBuildGlob = testBuildGlob;
