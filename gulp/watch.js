import gulp from "gulp";

import { allSrcGlob, allTestGlob, srcGlob } from "./globs";
import { build, generate } from "./build";
import { test } from "./test";

export const watch = (done) => {
  gulp.watch(allSrcGlob, build);
  gulp.watch(srcGlob, generate);
  gulp.watch(allTestGlob, test);
  done();
};

gulp.task("watch", watch);
