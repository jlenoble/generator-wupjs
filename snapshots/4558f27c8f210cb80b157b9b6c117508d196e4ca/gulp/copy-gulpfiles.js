import { src, dest, lastRun, task } from "gulp";
import newer from "gulp-newer";

const buildDir = "build";
const gulpfilesGlob = ["gulpfiles/**/*.js"];

export const copyGulpfiles = () => {
  return src(gulpfilesGlob, {
    since: lastRun(copyGulpfiles),
  })
    .pipe(newer(buildDir))
    .pipe(dest(buildDir));
};

task("copy:gulpfiles", copyGulpfiles);
