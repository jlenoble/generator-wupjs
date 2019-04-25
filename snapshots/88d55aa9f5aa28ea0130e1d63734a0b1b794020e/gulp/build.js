import {src, dest, lastRun, task} from "gulp";
import babel from "gulp-babel";
import sourcemaps from "gulp-sourcemaps";

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
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write(".", {
      sourceRoot: file => file.cwd
    }))
    .pipe(dest(buildDir));
};

task("build", build);
