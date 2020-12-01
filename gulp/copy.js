import gulp from "gulp";

import { generatorsDir, srcDir, templateGlob } from "./globs";

export const copy = () => {
  return gulp
    .src(templateGlob, {
      base: srcDir,
      since: gulp.lastRun(copy),
    })
    .pipe(gulp.dest(generatorsDir));
};

export const distCopy = () => {
  return gulp
    .src(templateGlob, {
      base: srcDir,
    })
    .pipe(gulp.dest(generatorsDir));
};

gulp.task("copy", copy);
gulp.task("dist-copy", distCopy);
