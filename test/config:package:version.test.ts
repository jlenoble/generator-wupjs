import testGenerator from "./common/test-generator";

testGenerator({
  title: "Adding a default package version",
  command: "yo wupjs:config:package:version",
  prompt: {},
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});

testGenerator({
  title: "Setting a package version",
  command: "yo wupjs:config:package:version",
  prompt: {
    "config:package:version": "1.2.3"
  },
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});
