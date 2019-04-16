import testGenerator from "./common/test-generator";

testGenerator({
  command: "yo wupjs:config:package:keywords",
  prompt: {
    "config:package:keywords": "foo, bar, quux"
  },
  assertContent: {
    "package.json": true
  }
});
