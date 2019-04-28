import gulp from "gulp";
import {usePlumbedGulpSrc} from "plumb-gulp";
import autoreload from "autoreload-gulp";

import "./gulp/build";
import "./gulp/clean";
import "./gulp/test";
import "./gulp/watch";
import "./gulp/tdd";
import "./gulp/lint";
import "./gulp/dist-build";

usePlumbedGulpSrc();

gulp.task("default", autoreload("tdd"));
