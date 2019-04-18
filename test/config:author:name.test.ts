import testGenerator from "./common/test-generator";

testGenerator({
  title: "Setting an author name",
  command: "yo wupjs:config:author:name"
});

testGenerator({
  title: "Setting an author name",
  command: "yo wupjs:config:author:name",
  prompt: {
    "config:author:name": "Me Me"
  }
});

testGenerator({
  title: "Setting an author name - French",
  command: "yo wupjs:config:author:name",
  prompt: {
    "config:author:name": "François d'Esparbès de Lussan d'Aubeterre"
  }
});

testGenerator({
  title: "Setting an author name - Japanese",
  command: "yo wupjs:config:author:name",
  prompt: {
    "config:author:name": "ルネ・デカルト"
  },
  assertContent: {
    "package.json": [
      /\[VALIDATION ERROR\] Name should be an actual name, for example:\\nJohn Doe, John-Paul Doe, John O'Doe, John P\. Doe/,
      /\[ANSWER\] \\"ルネ・デカルト\\"/
    ],
    LICENSE: [
      /\[VALIDATION ERROR\] Name should be an actual name, for example:\nJohn Doe, John-Paul Doe, John O'Doe, John P\. Doe/,
      /\[ANSWER\] "ルネ・デカルト"/
    ]
  },
  expectInvalid: ["package.json", "LICENSE"]
});

testGenerator({
  title: "Setting an author name - Chinese",
  command: "yo wupjs:config:author:name",
  prompt: {
    "config:author:name": "艾薩克·牛頓"
  },
  assertContent: {
    "package.json": [
      /\[VALIDATION ERROR\] Name should be an actual name, for example:\\nJohn Doe, John-Paul Doe, John O'Doe, John P\. Doe/,
      /\[ANSWER\] \\"艾薩克·牛頓\\"/
    ],
    LICENSE: [
      /\[VALIDATION ERROR\] Name should be an actual name, for example:\nJohn Doe, John-Paul Doe, John O'Doe, John P\. Doe/,
      /\[ANSWER\] "艾薩克·牛頓"/
    ]
  },
  expectInvalid: ["package.json", "LICENSE"]
});
