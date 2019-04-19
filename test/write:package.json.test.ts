import testGenerator from "./common/test-generator";

testGenerator({
  title: "Prompting for package.json required fields",
  command: "yo wupjs:write:package.json",
  prompt: {
    "config:author:name": "Me Me",
    "config:author:email": "me@example.com",
    "config:license": ["MIT"],
    "config:package:name": "awesome-app",
    "config:package:version": "1.2.3",
    "config:package:description": "Some dummy description",
    "config:package:keywords": "foo, bar, quux"
  },
  assertContent: {}
});

testGenerator({
  title: "Prompting for package.json - setting github username",
  command: "yo wupjs:write:package.json",
  prompt: {
    "config:author:name": "Me Me",
    "config:author:email": "me@example.com",
    "config:license": ["MIT"],
    "config:package:name": "awesome-app",
    "config:package:version": "1.2.3",
    "config:package:description": "Some dummy description",
    "config:package:keywords": "foo, bar, quux",
    "config:github:username": "me-me"
  },
  assertContent: {}
});
