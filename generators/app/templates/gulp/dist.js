import gulp from 'gulp';
import eslint from 'gulp-eslint';<% if (transpile !== 'none') { %>
import babel from 'gulp-babel';<% } %>

import {srcGlob, distDir} from './globs';

export const dist = () => {
  return gulp.src(srcGlob)
    .pipe(eslint())
    .pipe(eslint.format())<% if (transpile !== 'none') { %>
    .pipe(babel())<% } %>
    .pipe(gulp.dest(distDir));
};

gulp.task('dist', dist);
