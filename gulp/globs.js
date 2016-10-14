import path from 'path';

export const buildDir = 'build';
export const generatorsBuildDir = path.join(buildDir, 'generators');

export const generatorsSrcGlob = 'generators/**/*';
export const testSrcGlob = 'test/*.test.js';

export const allSrcGlob = testSrcGlob;
export const testBuildGlob = path.join(buildDir, testSrcGlob);
export const allBuildGlob = path.join(buildDir, testSrcGlob);
