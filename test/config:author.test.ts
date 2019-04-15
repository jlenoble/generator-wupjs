import testGenerator from "./common/test-generator";

testGenerator({
  command: "yo wupjs:config:author",
  prompt: {
    "config:author:name": "Me Me",
    "config:author:email": "me@example.com"
  },
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});
