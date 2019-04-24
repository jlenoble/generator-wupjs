import {src, dest, lastRun, task} from "gulp";
import babel from "gulp-babel";

const buildDir = "build";
const srcGlob = [
  "src/**/*.js",
  "test/**/*.js"
];

export const build = () => {
  return src(srcGlob, {
    base: process.cwd(),
    since: lastRun(build)
  })
    .pipe(babel())
    .pipe(dest(buildDir));
};

task("build", build);
