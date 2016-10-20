import gulp from 'gulp';

import {srcBuildGlob, allSrcGlob, allBuildGlob} from './globs';
import {build} from './build';
import {bundle} from './bundle';
import {test} from './test';

export const watch = done => {
  gulp.watch(allSrcGlob, build);
  gulp.watch(srcBuildGlob, bundle);
  gulp.watch(allBuildGlob, test);
  done();
};

gulp.task('watch', watch);
