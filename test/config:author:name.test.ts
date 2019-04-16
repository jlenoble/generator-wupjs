import testGenerator from "./common/test-generator";

testGenerator({
  title: "Setting an author name",
  command: "yo wupjs:config:author:name",
  prompt: {
    "config:author:name": "Me Me"
  },
  assertContent: {}
});
