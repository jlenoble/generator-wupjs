import testGenerator from "./common/test-generator";

testGenerator({
  title: "Prompting for LICENSE required fields",
  command: "yo wupjs:write:LICENSE",
  prompt: {
    "config:author:name": "Me Me",
    "config:author:email": "me@example.com",
    "config:license": ["MIT"]
  },
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});
