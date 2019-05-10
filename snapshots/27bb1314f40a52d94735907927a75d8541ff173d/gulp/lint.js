import gulp from "gulp";
import eslint from "gulp-eslint";

const lintGlob = [
  "src/**/*.ts",
  "test/**/*.ts"
];

export const handleLint = () => {
  return gulp.src(lintGlob)
    .pipe(eslint())
    .pipe(eslint.format());
};

gulp.task("lint", handleLint);
