import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';

import {distGlob, allTestGlob, distDir} from './globs';

export const dist = () => {
  return gulp.src(distGlob)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(gulp.dest(distDir));
};

export const lintTest = () => {
  return gulp.src(allTestGlob)
    .pipe(eslint())
    .pipe(eslint.format());
};

gulp.task('dist', gulp.parallel(dist, lintTest));
