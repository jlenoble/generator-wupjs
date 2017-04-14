import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

import {buildDir, srcDir, generatorsDir, srcGlob, allSrcGlob} from './globs';
// Tests change running context, so use absolute paths
const cwd = process.cwd();

export const build = () => {
  return gulp.src(allSrcGlob, {
    base: cwd,
    since: gulp.lastRun(build),
  })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildDir));
};

export const generate = () => {
  return gulp.src(srcGlob, {
    base: srcDir,
    since: gulp.lastRun(generate),
  })
    .pipe(babel())
    .pipe(gulp.dest(generatorsDir));
};

gulp.task('build', gulp.parallel(build, generate));
