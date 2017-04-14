import gulp from 'gulp';
import del from 'del';

import {buildDir, generatorsDir} from './globs';

export const clean = () => {
  return del([buildDir, generatorsDir]);
};

gulp.task('clean', clean);
