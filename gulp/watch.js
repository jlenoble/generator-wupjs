import gulp from "gulp";

import { allSrcGlob, allBuildGlob, templateGlob, srcGlob } from "./globs";
import { build, generate } from "./build";
import { copy } from "./copy";
import { test } from "./test";

export const watch = done => {
  gulp.watch(allSrcGlob, build);
  gulp.watch(srcGlob, generate);
  // gulp.watch(allBuildGlob, test);
  gulp.watch(templateGlob, copy);
  done();
};

gulp.task("watch", watch);
