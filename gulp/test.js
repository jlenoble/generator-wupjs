import gulp from "gulp";
import mocha from "gulp-mocha";

import { testBuildGlob } from "./globs";
import "./build";
import "./copy";

export const test = () => {
  return gulp.src(testBuildGlob).pipe(mocha());
};

export const updateSnapshots = () => {
  return gulp.src(testBuildGlob).pipe(
    mocha({
      updateSnapshots: true
    })
  );
};

gulp.task("test", gulp.series(gulp.parallel("build", "copy"), test));
gulp.task(
  "update-snapshots",
  gulp.series(gulp.parallel("build", "copy"), updateSnapshots)
);
