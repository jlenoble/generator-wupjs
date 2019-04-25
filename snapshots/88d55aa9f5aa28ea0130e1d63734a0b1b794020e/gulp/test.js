import {src, task, series} from "gulp";
import mocha from "gulp-mocha";

const testGlob = [
  "build/test/**/*.test.js"
];

export const test = () => {
  return src(testGlob)
    .pipe(mocha({
      require: ["source-map-support/register"]
    }));
};

task("test", series("build", test));
