import {src, task} from "gulp";
import mocha from "gulp-mocha";

const testGlob = [
  "build/test/**/*.test.js"
];

export const test = () => {
  return src(testGlob)
    .pipe(mocha());
};

task("test", gulp.series("build", test));
