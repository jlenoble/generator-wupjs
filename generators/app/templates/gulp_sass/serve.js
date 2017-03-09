import gulp from 'gulp';
import path from 'path';
import browserSync from 'browser-sync';

import {buildDir, srcDir, bundleBuildGlob, cssBuildGlob} from './globs';
import './bundle';

export const serve = done => {
  const bs = browserSync.create('server');

  bs.init({
    ui: false,
    port: 3000,
    server: {
      baseDir: [buildDir, srcDir, 'node_modules'],
    },
  }, done);

  gulp.watch([path.join(srcDir, 'index.html'),
    cssBuildGlob,
    bundleBuildGlob]).on('change', (...args) => {
      bs.reload(...args);
    });
};

gulp.task('serve', serve);
