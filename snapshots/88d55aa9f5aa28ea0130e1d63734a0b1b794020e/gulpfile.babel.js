import gulp from "gulp";
import {usePlumbedGulpSrc} from "plumb-gulp";
import autoreload from "autoreload-gulp";

import "./gulp/build";

usePlumbedGulpSrc();

gulp.task("default", autoreload("build"));