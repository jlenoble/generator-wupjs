import gulp from "gulp";
import {usePlumbedGulpSrc} from "plumb-gulp";
import autoreload from "autoreload-gulp";

import "./gulp/build";
import "./gulp/clean";
import "./gulp/test";
import "./gulp/watch";

usePlumbedGulpSrc();

gulp.task("default", autoreload("build"));
