import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';

import {distGlob, distDir} from './globs';

export const dist = () => {
  return gulp.src(distGlob)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(gulp.dest(distDir));
};

gulp.task('dist', dist);
