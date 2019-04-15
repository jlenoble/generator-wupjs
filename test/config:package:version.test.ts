import testGenerator from "./common/test-generator";

testGenerator({
  command: "yo wupjs:config:package:version",
  prompt: {},
  assertContent: {
    "package.json": true
  }
});

testGenerator({
  command: "yo wupjs:config:package:version",
  prompt: {
    "config:package:version": "1.2.3"
  },
  assertContent: {
    "package.json": true
  }
});
