import gulp from "gulp";

// import "./test";
import "./build";
import "./copy";
import "./watch";

// gulp.task('tdd', gulp.series('test', 'watch'));
gulp.task("tdd", gulp.series("build", "copy", "watch"));
