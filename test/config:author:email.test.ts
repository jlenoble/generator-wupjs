import testGenerator from "./common/test-generator";

testGenerator({
  title: "Setting a default author email",
  command: "yo wupjs:config:author:email"
});

testGenerator({
  title: "Setting an author email",
  command: "yo wupjs:config:author:email",
  prompt: {
    "config:author:email": "me@example.com"
  }
});
