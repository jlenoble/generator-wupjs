import { src, dest, lastRun, task, series } from "gulp";
import babel from "gulp-babel";
import sourcemaps from "gulp-sourcemaps";
import cached from "gulp-cached";
import newer from "gulp-newer";
import { convertNotebooks } from "./notebooks";

const buildDir = "build";
const srcGlob = ["src/**/*.js", "test/**/*.js"];

export const handleBuild = () => {
  return src(srcGlob, {
    base: process.cwd(),
    since: lastRun(handleBuild),
  })
    .pipe(newer(buildDir))
    .pipe(cached())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(
      sourcemaps.write(".", {
        sourceRoot: (file) => file.cwd,
      })
    )
    .pipe(dest(buildDir));
};

const prebuild = convertNotebooks;
const build = series(prebuild, handleBuild);

task("build", build);
