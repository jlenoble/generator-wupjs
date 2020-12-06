import testGenerator from "./common/test-generator";
import {
  configFiles,
  gulpFiles,
  docFiles,
  files,
  prompt,
} from "./common/default-options";

testGenerator({
  title: "Testing main generator: Vanilla",
  command: "yo wupjs",
  prompt,
  assertContent: {
    ...configFiles,
    ...gulpFiles,
    ...docFiles(),
    ...files("js"),
  },
});

testGenerator({
  title: "Testing main generator: with Typescript",
  command: "yo wupjs",
  prompt: {
    ...prompt,
    "config:languages:typescript": true,
  },
  assertContent: {
    ...configFiles,
    "tsconfig.json": true,
    ...gulpFiles,
    "gulp/types.js": true,
    ...docFiles("ts"),
    ...files("ts"),
  },
});

testGenerator({
  title: "Testing main generator: with Jupyter",
  command: "yo wupjs",
  prompt: {
    ...prompt,
    "config:languages:jupyter": true,
  },
  assertContent: {
    ...configFiles,
    ...gulpFiles,
    ...docFiles(),
    "gulp/notebooks.js": true,
    ...files("js"),
  },
});

testGenerator({
  title: "Testing main generator: with ANTLR4",
  command: "yo wupjs",
  prompt: {
    ...prompt,
    "config:languages:antlr4": true,
  },
  assertContent: {
    ...configFiles,
    ...gulpFiles,
    ...docFiles(),
    "gulp/parse.js": true,
    ...files("js"),
    "src/static/antlr4/MyListener.js": true,
    "src/static/antlr4/grammars/MyGrammar.g4": true,
    "src/static/data/data.txt": true,
  },
});

testGenerator({
  title: "Testing main generator: Monorepo",
  command: "yo wupjs",
  prompt: {
    ...prompt,
    "config:monorepo": true,
    "config:monorepo:packages": [
      "autoreload-gulp",
      "plumb-gulp",
      "muter",
      "cleanup-wrapper",
      "stat-again",
    ],
  },
  assertContent: {
    ...configFiles,
    ...gulpFiles,
    ...docFiles(),
    "gulp/monorepo.js": true,
    ...files("js"),
  },
});

testGenerator({
  title: "Testing main generator: gulfilesDir",
  command: "yo wupjs",
  prompt: {
    ...prompt,
    "config:gulp:hasGulpfilesDir": true,
    "config:paths:gulpfiles": "gulpfiles",
  },
  assertContent: {
    ...configFiles,
    ...gulpFiles,
    ...docFiles(),
    "gulp/copy-gulpfiles.js": true,
    "gulpfiles/gulpfile.js": true,
    ...files("js"),
  },
});

testGenerator({
  title: "Testing main generator: with both Javascript and Typescript",
  command: "yo wupjs",
  prompt: {
    ...prompt,
    "config:languages:typescript": true,
    "config:languages:extensions": ["js", "ts"],
  },
  assertContent: {
    ...configFiles,
    "tsconfig.json": true,
    ...gulpFiles,
    "gulp/types.js": true,
    ...docFiles("ts"),
    ...files("js", "ts"),
  },
});
