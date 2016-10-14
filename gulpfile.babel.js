import gulp from 'gulp';
import plumber from 'gulp-plumber';

import './gulp/test';
import './gulp/prepublish';

const originalSrc = gulp.src;
gulp.src = function() {
  return originalSrc.apply(gulp, arguments)
    .pipe(plumber({
      errorHandler: function(err) {
        console.error(err);
        this.emit('end');
      }
    }));
};

gulp.task('default', gulp.parallel('test'));
