import gulp from "gulp";

// import "./test";
import "./build";
import "./watch";

// gulp.task('tdd', gulp.series('test', 'watch'));
gulp.task("tdd", gulp.series("build", "watch"));
