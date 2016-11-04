import gulp from 'gulp';

import './test';
import './clean';

gulp.task('prepublish', gulp.series('test', 'clean'));
