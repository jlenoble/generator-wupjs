import { src, dest, task } from "gulp";
import babel from "gulp-babel";

const libDir = "lib";
const libGlob = ["src/**/*.js", "src/**/*.ts"];

export const distBuild = () => {
  return src(libGlob)
    .pipe(babel())
    .pipe(dest(libDir));
};

task("dist-build", distBuild);
