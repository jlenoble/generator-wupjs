import testGenerator from "./common/test-generator";
import {
  configFiles,
  gulpFiles,
  docFiles,
  prompt
} from "./common/default-options";

testGenerator({
  title: "Testing main generator: Vanilla",
  command: "yo wupjs",
  prompt,
  assertContent: {
    ...configFiles,
    ...gulpFiles,
    ...docFiles,
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
    "gulp/types.js": true,
    ...docFiles,
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
    ...docFiles,
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
    ...docFiles,
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
    ...docFiles,
    "gulp/monorepo.js": true,
    "src/index.js": true,
    "test/index.test.js": true
  }
});

testGenerator({
  title: "Testing main generator: with both Javascript and Typescript",
  command: "yo wupjs",
  prompt: {
    ...prompt,
    "config:languages:typescript": true,
    "config:languages:extensions": ["js", "ts"]
  },
  assertContent: {
    ...configFiles,
    "tsconfig.json": true,
    ...gulpFiles,
    "gulp/types.js": true,
    ...docFiles,
    "src/js/index.js": true,
    "test/js/index.test.js": true,
    "src/ts/index.ts": true,
    "test/ts/index.test.ts": true
  }
});
