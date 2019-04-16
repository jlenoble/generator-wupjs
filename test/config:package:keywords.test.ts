import testGenerator from "./common/test-generator";

testGenerator({
  title: "Setting package keywords",
  command: "yo wupjs:config:package:keywords",
  prompt: {
    "config:package:keywords": "foo, bar, quux"
  },
  assertContent: {}
});
