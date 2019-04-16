import testGenerator from "./common/test-generator";

testGenerator({
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": []
  },
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});
