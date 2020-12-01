import { task } from "gulp";
import del from "del";

export const distClean = () => {
  return del("generators");
};

task("dist-clean", distClean);
