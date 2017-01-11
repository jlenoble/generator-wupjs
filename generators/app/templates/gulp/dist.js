import gulp from 'gulp';
import eslint from 'gulp-eslint';<% if (transpile !== 'none') { %>
import babel from 'gulp-babel';<% } %>
import rename from 'gulp-rename';

import {srcGlob} from './globs';

export const dist = () => {
  return gulp.src(srcGlob)
    .pipe(eslint())
    .pipe(eslint.format())<% if (transpile !== 'none') { %>
    .pipe(babel())<% } %>
    .pipe(rename('index.js'))
    .pipe(gulp.dest('.'));
};

gulp.task('dist', dist);
