import gulp from "gulp";
import eslint from "gulp-eslint";

const lintGlob = [
  "src/**/*.js",
  "test/**/*.js"
];

export const lint = () => {
  return gulp.src(lintGlob)
    .pipe(eslint())
    .pipe(eslint.format());
};

gulp.task("lint", lint);
