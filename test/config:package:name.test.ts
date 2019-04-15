import testGenerator from "./common/test-generator";

testGenerator({
  command: "yo wupjs:config:package:name",
  prompt: {},
  assertContent: {
    "package.json": true
  }
});
