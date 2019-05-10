import gulp from "gulp";
import eslint from "gulp-eslint";

const lintGlob = [
  "src/**/*.js",
  "test/**/*.js",
  "!src/static/antlr4/parsers/**/*.js"
];

export const handleLint = () => {
  return gulp.src(lintGlob)
    .pipe(eslint())
    .pipe(eslint.format());
};

gulp.task("lint", handleLint);
