import gulp from "gulp";
import ts from "gulp-typescript";

const buildDir = "build";
const buildSrcDir = "build/src";
const libDir = "lib";
const libGlob = ["src/**/*.ts"];
const declareGlob = ["build/src/**/*.d.ts"];
const tsProject = ts.createProject("tsconfig.json");

const handleTypes = () => {
  const tsResult = gulp
    .src(libGlob, {
      base: process.cwd(),
      since: gulp.lastRun(handleTypes)
    })
    .pipe(tsProject());

  return tsResult.dts.pipe(gulp.dest(buildDir));
};

const copyTypes = () => {
  return gulp
    .src(declareGlob, {
      base: buildSrcDir,
      since: gulp.lastRun(copyTypes)
    })
    .pipe(gulp.dest(libDir));
};

gulp.task("types", gulp.series(handleTypes, copyTypes));
