import testGenerator from "./common/test-generator";
import { configFiles, gulpFiles } from "./common/default-options";

testGenerator({
  title: "Testing main generator: Vanilla",
  command: "yo wupjs",
  prompt: {
    "config:author:name": "Me Me",
    "config:author:email": "me@example.com",
    "config:license": ["MIT"],
    "config:package:name": "awesome-app",
    "config:package:version": "1.2.3",
    "config:package:description": "Some dummy description",
    "config:package:keywords": "foo, bar, quux",
    "config:github:username": "me-me"
  },
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
    "config:author:name": "Me Me",
    "config:author:email": "me@example.com",
    "config:license": ["MIT"],
    "config:package:name": "awesome-app",
    "config:package:version": "1.2.3",
    "config:package:description": "Some dummy description",
    "config:package:keywords": "foo, bar, quux",
    "config:github:username": "me-me",
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
    "config:author:name": "Me Me",
    "config:author:email": "me@example.com",
    "config:license": ["MIT"],
    "config:package:name": "awesome-app",
    "config:package:version": "1.2.3",
    "config:package:description": "Some dummy description",
    "config:package:keywords": "foo, bar, quux",
    "config:github:username": "me-me",
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
    "config:author:name": "Me Me",
    "config:author:email": "me@example.com",
    "config:license": ["MIT"],
    "config:package:name": "awesome-app",
    "config:package:version": "1.2.3",
    "config:package:description": "Some dummy description",
    "config:package:keywords": "foo, bar, quux",
    "config:github:username": "me-me",
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
