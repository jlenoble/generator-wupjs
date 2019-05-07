import {task, series} from "gulp";

import "./test";
import "./notebooks";
import "./watch";

task("tdd", series("notebooks", "test", "watch"));
