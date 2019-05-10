import { src, dest, lastRun, task, series } from "gulp";
import babel from "gulp-babel";
import sourcemaps from "gulp-sourcemaps";
import cached from "gulp-cached";
import newer from "gulp-newer";
import { makeParser, copyParser } from "./parse";

const buildDir = "build";
const srcGlob = [
  "src/**/*.js",
  "test/**/*.js"
];

export const build = () => {
  return src(srcGlob, {
    base: process.cwd(),
    since: lastRun(build)
  })
    .pipe(newer(buildDir))
    .pipe(cached())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write(".", {
      sourceRoot: file => file.cwd
    }))
    .pipe(dest(buildDir));
};

const handleParse = series(makeParser, copyParser);
const prebuild = handleParse;
const handleBuild = series(prebuild, build);

task("build", handleBuild);
