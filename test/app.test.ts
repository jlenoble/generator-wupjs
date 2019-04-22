import testGenerator from "./common/test-generator";

testGenerator({
  title: "Testing main generator: Prompting for everything",
  command: "yo wupjs",
  prompt: {
    "config:author:name": "Me Me",
    "config:author:email": "me@example.com",
    "config:license": ["MIT"],
    "config:package:name": "awesome-app",
    "config:package:version": "1.2.3",
    "config:package:description": "Some dummy description",
    "config:package:keywords": "foo, bar, quux"
  },
  assertContent: {
    "src/index.ts": true,
    "test/index.test.ts": true
  }
});
