import gulp from "gulp";
import eslint from "gulp-eslint";

const srcGlob = [
  "src/**/*.js",
  "test/**/*.js"
];

export const lint = () => {
  return gulp.src(srcGlob)
    .pipe(eslint())
    .pipe(eslint.format());
};

gulp.task("lint", lint);
