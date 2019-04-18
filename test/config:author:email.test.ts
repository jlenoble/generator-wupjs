import testGenerator from "./common/test-generator";

testGenerator({
  title: "Setting an author email",
  command: "yo wupjs:config:author:email",
  prompt: {
    "config:author:email": "me@example.com"
  }
});
