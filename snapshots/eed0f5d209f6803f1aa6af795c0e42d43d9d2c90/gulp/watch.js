import { task, watch } from "gulp";
import path from "path";
import del from "del";
import { build } from "./build";
import { test } from "./test";
import { makeParser } from "./parse";

const buildDir = "build";
const srcGlob = [
  "src/**/*.js",
  "test/**/*.js",
  "!src/static/antlr4/parsers/**/*.js"
];
const buildGlob = [
  "build/src/**/*.js",
  "build/test/**/*.js"
];
const grammarGlob = [
  "src/static/antlr4/grammars/**/*.g4"
];

export const startWatching = done => {
  const watcher = watch(srcGlob, {events: ["add", "change"]}, build);

  watcher.on("unlink", file => {
    const buildFile = path.join(buildDir, file.replace(/(\.[\w]+)$/, ".js"));
    const mapFile = path.join(buildDir, file.replace(/(\.[\w]+)$/, ".js.map"));
    del(buildFile).catch(() => {});
    del(mapFile).catch(() => {});
  });

  watch(buildGlob, test);
  watch(grammarGlob, makeParser);

  done();
};

task("watch", startWatching);
