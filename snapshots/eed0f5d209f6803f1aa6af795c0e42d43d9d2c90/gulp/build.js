import { src, dest, lastRun, task, parallel } from "gulp";
import babel from "gulp-babel";
import sourcemaps from "gulp-sourcemaps";
import cached from "gulp-cached";
import newer from "gulp-newer";
import { makeParser } from "./parse";

const buildDir = "build";
const srcGlob = [
  "src/**/*.js",
  "test/**/*.js",
  "!src/static/antlr4/parsers/**/*.js"
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

task("build", parallel(build, makeParser));
