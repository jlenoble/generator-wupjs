import testGenerator from "./common/test-generator";

testGenerator({
  command: "yo wupjs:config:package",
  prompt: {
    "config:package:name": "awesome-app",
    "config:package:version": "1.2.3",
    "config:package:description": "Some dummy description",
    "config:package:keywords": "foo, bar, quux"
  },
  assertContent: {
    "package.json": true
  }
});
