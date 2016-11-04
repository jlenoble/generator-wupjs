import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

import {buildDir, allSrcGlob} from './globs';
// Tests change running context, so use absolute paths
const cwd = process.cwd();

export const build = () => {
  return gulp.src(allSrcGlob, {
    base: cwd,
    since: gulp.lastRun(build)
  })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildDir));
};

gulp.task('build', build);
