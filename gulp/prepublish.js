import gulp from 'gulp';

import './test';
import './clean';
import './doc';
import './lint';

gulp.task('prepublish', gulp.series('clean', 'test', 'doc', 'lint'));
