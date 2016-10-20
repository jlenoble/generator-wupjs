import path from 'path';

export const srcDir = 'src';
export const testDir = 'test';
export const buildDir = 'build';

export const apps = ['<%= module %>'];
export const bundleGlob = 'bundle.js';

export const srcGlob = path.join(srcDir, '**/*.js');
export const testGlob = path.join(testDir, '**/*.test.js');

export const srcBuildGlob = path.join(buildDir, srcGlob);
export const testBuildGlob = path.join(buildDir, testGlob);

export const allSrcGlob = [srcGlob, testGlob];
export const allBuildGlob = [srcBuildGlob, testBuildGlob];

export const bundleRootGlob = path.join(buildDir, srcDir, 'index.js');
export const bundleBuildGlob = path.join(buildDir, bundleGlob);
