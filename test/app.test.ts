import testGenerator from "./common/test-generator";

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
    "src/index.js": true,
    "test/index.test.js": true
  }
});
