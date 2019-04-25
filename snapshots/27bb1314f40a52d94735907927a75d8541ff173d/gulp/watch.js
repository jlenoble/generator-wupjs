import {task, watch} from "gulp";
import {build} from './build';
import {test} from './test';

const srcGlob = [
  "src/**/*.ts",
  "test/**/*.ts"
];
const buildGlob = [
  "build/src/**/*.js",
  "build/test/**/*.js"
];

export const startWatching = done => {
  watch(srcGlob, build);
  watch(buildGlob, test);
  done();
};

task("watch", startWatching);
