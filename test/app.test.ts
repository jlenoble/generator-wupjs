import path from "path";
import testGenerator from "./common/test-generator";
import { configFiles, gulpFiles, prompt } from "./common/default-options";

testGenerator({
  title: "Testing main generator: Vanilla",
  command: "yo wupjs",
  prompt,
  assertContent: {
    ...configFiles,
    ...gulpFiles,
    "src/index.js": true,
    "test/index.test.js": true
  }
});

testGenerator({
  title: "Testing main generator: with Typescript",
  command: "yo wupjs",
  prompt: {
    ...prompt,
    "config:languages:typescript": true
  },
  assertContent: {
    ...configFiles,
    "tsconfig.json": true,
    ...gulpFiles,
    "src/index.ts": true,
    "test/index.test.ts": true
  }
});

testGenerator({
  title: "Testing main generator: with Jupyter",
  command: "yo wupjs",
  prompt: {
    ...prompt,
    "config:languages:jupyter": true
  },
  assertContent: {
    ...configFiles,
    ...gulpFiles,
    "gulp/notebooks.js": true,
    "src/index.js": true,
    "test/index.test.js": true
  }
});

testGenerator({
  title: "Testing main generator: with ANTLR4",
  command: "yo wupjs",
  prompt: {
    ...prompt,
    "config:languages:antlr4": true
  },
  assertContent: {
    ...configFiles,
    ...gulpFiles,
    "gulp/parse.js": true,
    "src/index.js": true,
    "test/index.test.js": true,
    "src/static/antlr4/MyListener.js": true,
    "src/static/antlr4/grammars/MyGrammar.g4": true,
    "src/static/data/data.txt": true
  }
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
      "stat-again"
    ]
  },
  assertContent: {
    ...configFiles,
    ...gulpFiles,
    "gulp/monorepo.js": true,
    "src/index.js": true,
    "test/index.test.js": true
  }
});
