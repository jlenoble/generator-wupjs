import {task} from "gulp";
import del from "del";

export const clean = () => {
  return Promise.all([
    del("build")
  ]);
};

task("clean", clean);
