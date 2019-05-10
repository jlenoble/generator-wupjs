import {task} from "gulp";
import del from "del";

export const clean = () => {
  return Promise.all([
    del("build"),
    del("src/static/antlr4/parsers")
  ]);
};

task("clean", clean);
