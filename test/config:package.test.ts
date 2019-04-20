import testGenerator from "./common/test-generator";

testGenerator({
  title: "setting proper package fields",
  command: "yo wupjs:config:package",
  prompt: {
    "config:package:name": "awesome-app",
    "config:package:version": "1.2.3",
    "config:package:description": "Some dummy description",
    "config:package:keywords": "foo, bar, quux"
  }
});

testGenerator({
  title: "setting proper package fields - with github:username",
  command: "yo wupjs:config:package",
  prompt: {
    "config:package:name": "awesome-app",
    "config:package:version": "1.2.3",
    "config:package:description": "Some dummy description",
    "config:package:keywords": "foo, bar, quux",
    "config:github:username": "me-me"
  }
});
