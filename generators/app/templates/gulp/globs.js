import path from 'path';

export const buildDir = 'build';
export const srcGlob = 'src/<%= module %>.js';
export const testSrcGlob = 'test/*.test.js';

export const allSrcGlob = [srcGlob, testSrcGlob];
export const testBuildGlob = path.join(buildDir, testSrcGlob);
export const allBuildGlob = [
  path.join(buildDir, srcGlob),
  path.join(buildDir, testSrcGlob)
];
