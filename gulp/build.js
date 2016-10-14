import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

import {buildDir, generatorsBuildDir,
  generatorsSrcGlob, allSrcGlob} from './globs';

export const copy = () => {
  return gulp.src(generatorsSrcGlob)
    .pipe(gulp.dest(generatorsBuildDir));
};

export const build = () => {
  return gulp.src(allSrcGlob, {
    base: process.cwd(),
    since: gulp.lastRun(build)
  })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildDir));
};

gulp.task('build', gulp.parallel(copy, build));
