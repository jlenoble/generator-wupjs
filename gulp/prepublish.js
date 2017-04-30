import gulp from 'gulp';

import './test';
import './clean';
import './doc';

gulp.task('prepublish', gulp.series('clean', 'test', 'doc'));
