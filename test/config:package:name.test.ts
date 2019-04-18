import testGenerator from "./common/test-generator";

testGenerator({
  title: "Setting a default package name",
  command: "yo wupjs:config:package:name"
});

testGenerator({
  title: "Setting a package name",
  command: "yo wupjs:config:package:name",
  prompt: {
    "config:package:name": "awesome-app"
  }
});
