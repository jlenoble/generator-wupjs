import testGenerator from "./common/test-generator";

testGenerator({
  command: "yo wupjs:config:package:name",
  prompt: {},
  assertContent: {
    "package.json": true
  }
});

testGenerator({
  command: "yo wupjs:config:package:name",
  prompt: {
    "config:package:name": "awesome-app"
  },
  assertContent: {
    "package.json": true
  }
});
