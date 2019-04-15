import testGenerator from "./common/test-generator";

testGenerator({
  command: "yo wupjs:config:package:description",
  prompt: {},
  assertContent: {
    "package.json": true
  }
});

testGenerator({
  command: "yo wupjs:config:package:description",
  prompt: {
    "config:package:description": "Some dummy description"
  },
  assertContent: {
    "package.json": true
  }
});
