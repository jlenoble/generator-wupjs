import testGenerator from "./common/test-generator";

testGenerator({
  command: "yo wupjs:config:author:name",
  prompt: {
    "config:author:name": "Me Me"
  },
  globalConfig: {},
  assertContent: {}
});
