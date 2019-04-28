import {src, dest, task} from "gulp";
import babel from "gulp-babel";

const libDir = "lib";
const libGlob = [
  "src/**/*.js"
];

export const distBuild = () => {
  return src(libGlob, {
    base: process.cwd()
  })
    .pipe(babel())
    .pipe(dest(libDir));
};

task("dist-build", distBuild);
