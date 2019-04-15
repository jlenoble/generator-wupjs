import testGenerator from "./common/test-generator";

testGenerator({
  command: "yo wupjs:config:author:email",
  prompt: {
    "config:author:email": "me@example.com"
  },
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});
