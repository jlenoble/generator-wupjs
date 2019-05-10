import { src, task, series, parallel } from "gulp";
import antlr4 from "gulp-antlr4";
import newer from "gulp-newer";

const parserDir = "src/static/antlr4/parsers";
const parserOptions = { parserDir };

const grammarGlob = [
  "src/static/antlr4/grammars/**/*.g4"
];
const parserGlob = [
  "src/static/antlr4/parsers/**/*.interp",
  "src/static/antlr4/parsers/**/*.tokens"
];
const dataGlob = [
  "src/static/data/**/*"
];

const grammar = "MyGrammar";
const rule = "prog";

const listener = "MyListener";
const listenerDir = "src/static/antlr4";
parserOptions.listener = listener;

export const makeParser = () => {
  if (require && require.cache) {
    // Remove parser files from Babel cache
    Object.keys(require.cache).filter(key => {
      return key.includes(parserDir) ||
        key.includes(listenerDir);
    }).forEach(key => {
      delete require.cache[key];
    });
  }

  return src(grammarGlob)
    .pipe(antlr4(parserOptions));
};

export const copyParser = () => {
  return src(parserGlob, {
    base: process.cwd(),
    since: lastRun(copyParser)
  })
    .pipe(newer(buildDir))
    .pipe(dest(buildDir))
};

export const translate = () => {
  return src(dataGlob)
    .pipe(antlr4({
      grammar, parserDir, listener, listenerDir, rule
    }));
};

task("translate", series(makeParser, translate));

export const parse = translate;

task("parse", series(makeParser, translate));
