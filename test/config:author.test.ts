import testGenerator from "./common/test-generator";

testGenerator({
  title: "Setting both author name and email",
  command: "yo wupjs:config:author",
  prompt: {
    "config:author:name": "Me Me",
    "config:author:email": "me@example.com"
  }
});
