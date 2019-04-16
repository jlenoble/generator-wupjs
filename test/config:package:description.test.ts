import testGenerator from "./common/test-generator";

testGenerator({
  title: "Setting a package description",
  command: "yo wupjs:config:package:description",
  prompt: {
    "config:package:description": "Some dummy description"
  },
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});
