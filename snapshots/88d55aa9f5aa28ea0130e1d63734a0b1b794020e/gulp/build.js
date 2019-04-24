import {src, dest, lastRun} from "gulp";
import babel from "gulp-babel";

const buildDir = "build";
const srcGlob = [
  "src/**/*.ts",
  "test/**/*.ts"
];

export const build = () => {
  return src(srcGlob, {
    base: process.cwd(),
    since: lastRun(build)
  })
    .pipe(babel())
    .pipe(dest(buildDir));
};

gulp.task("build", build);
