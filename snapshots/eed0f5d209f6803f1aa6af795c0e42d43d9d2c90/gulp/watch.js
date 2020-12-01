import { task, watch, series } from "gulp";
import path from "path";
import del from "del";
import { handleBuild as build } from "./build";
import { handleTest as test } from "./test";
import { handleParse } from "./parse";

const buildDir = "build";
const srcGlob = [
  "src/**/*.js",
  "test/**/*.js",
  "!src/static/antlr4/parsers/**/*.js",
];
const buildGlob = [
  "build/src/**/*.js",
  "build/test/**/*.js",
  "!build/src/static/antlr4/parsers/**/*.js",
];
const grammarGlob = ["src/static/antlr4/grammars/**/*.g4"];

export const startWatching = (done) => {
  const watcher = watch(srcGlob, { events: ["add", "change"] }, build);

  watcher.on("unlink", (file) => {
    const buildFile = path.join(buildDir, file.replace(/(\.[\w]+)$/, ".js"));
    const mapFile = path.join(buildDir, file.replace(/(\.[\w]+)$/, ".js.map"));
    del(buildFile).catch(() => {});
    del(mapFile).catch(() => {});
  });

  watch(buildGlob, test);
  watch(grammarGlob, series(handleParse, test));

  done();
};

task("watch", startWatching);
