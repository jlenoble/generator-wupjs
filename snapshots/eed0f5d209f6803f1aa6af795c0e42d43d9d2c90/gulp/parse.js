import { src, dest, task, series, parallel, lastRun } from "gulp";
import antlr4 from "gulp-antlr4";
import newer from "gulp-newer";
import sourcemaps from "gulp-sourcemaps";

const buildDir = "build";
const parserDir = "src/static/antlr4/parsers";
const parserOptions = { parserDir };

const grammarGlob = ["src/static/antlr4/grammars/**/*.g4"];
const parserTokenGlob = [
  "src/static/antlr4/parsers/**/*.interp",
  "src/static/antlr4/parsers/**/*.tokens"
];
const parserSrcGlob = ["src/static/antlr4/parsers/**/*.js"];
const dataGlob = ["src/static/data/**/*"];

const grammar = "MyGrammar";
const rule = "prog";

const listener = "MyListener";
const listenerDir = "src/static/antlr4";
parserOptions.listener = listener;

const makeParser = () => {
  if (require && require.cache) {
    // Remove parser files from Babel cache
    Object.keys(require.cache)
      .filter(key => {
        return key.includes(parserDir) || key.includes(listenerDir);
      })
      .forEach(key => {
        delete require.cache[key];
      });
  }

  return src(grammarGlob).pipe(antlr4(parserOptions));
};

const copyParser = () => {
  return src(parserTokenGlob, {
    base: process.cwd(),
    since: lastRun(copyParser)
  })
    .pipe(newer(buildDir))
    .pipe(dest(buildDir));
};

const transpileParser = () => {
  return src(parserSrcGlob, {
    base: process.cwd(),
    since: lastRun(transpileParser)
  })
    .pipe(newer(buildDir))
    .pipe(sourcemaps.init())
    .pipe(
      sourcemaps.write(".", {
        sourceRoot: file => file.cwd
      })
    )
    .pipe(dest(buildDir));
};

export const handleParse = series(
  makeParser,
  parallel(copyParser, transpileParser)
);

export const translate = () => {
  return src(dataGlob).pipe(
    antlr4({
      grammar,
      parserDir,
      listener,
      listenerDir,
      rule
    })
  );
};

task("translate", series(handleParse, translate));

export const parse = translate;

task("parse", series(handleParse, translate));
