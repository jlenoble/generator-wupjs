import gulp from 'gulp';
import {usePlumbedGulpSrc} from 'plumb-gulp';
import autoreload from 'autoreload-gulp';

<% if(addons.includes('React')) { %>import './gulp/serve';
<% } %>import './gulp/tdd';
import './gulp/prepublish';

usePlumbedGulpSrc();

gulp.task('default', autoreload('tdd'));
