import gulp from "gulp";
import mocha from "gulp-mocha";

import { testBuildGlob } from "./globs";
import "./build";
import "./copy";
import "./dist-build";

export const test = () => {
  return gulp.src(testBuildGlob).pipe(
    mocha({
      require: ["source-map-support/register"],
      reporter: "mochawesome",
      reporterOptions: {
        reportFilename: "mochawesome-dev",
      },
    })
  );
};

export const updateSnapshots = () => {
  return gulp.src(testBuildGlob).pipe(
    mocha({
      updateSnapshots: true,
    })
  );
};

gulp.task(
  "test",
  gulp.series(gulp.parallel("build", "copy", "dist-build"), test)
);
gulp.task(
  "update-snapshots",
  gulp.series(gulp.parallel("build", "copy", "dist-build"), updateSnapshots)
);
