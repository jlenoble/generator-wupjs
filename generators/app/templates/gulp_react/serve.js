import gulp from 'gulp';
import browserSync from 'browser-sync';

import {buildDir, bundleBuildGlob} from './globs';
import './bundle';

export const serve = done => {
  var bs = browserSync.create('server');

  bs.init({
    ui: false,
    port: 3000,
    server: {
      baseDir: [buildDir, 'src']
    }
  }, done);

  gulp.watch(['src/index.html', bundleBuildGlob]).on('change', (...args) => {
    bs.reload(...args);
  });
};

gulp.task('serve', gulp.series('bundle', serve));
