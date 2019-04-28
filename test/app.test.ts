import testGenerator from "./common/test-generator";

const configFiles: Wup.Options = {
  ".babelrc": true,
  ".eslintrc": true,
  ".gitignore": true
};

const gulpFiles: Wup.Options = {
  "gulpfile.babel.js": true,
  "gulp/build.js": true,
  "gulp/clean.js": true,
  "gulp/test.js": true,
  "gulp/watch.js": true,
  "gulp/tdd.js": true,
  "gulp/lint.js": true,
  "gulp/dist-build.js": true
};

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
    ...gulpFiles,
    "src/index.ts": true,
    "test/index.test.ts": true
  }
});
