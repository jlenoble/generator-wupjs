import testGenerator from "./common/test-generator";

testGenerator({
  title: "Setting an author name",
  command: "yo wupjs:config:author:name",
  prompt: {
    "config:author:name": "Me Me"
  },
  assertContent: {}
});

testGenerator({
  title: "Setting an author name - French",
  command: "yo wupjs:config:author:name",
  prompt: {
    "config:author:name": "François d'Esparbès de Lussan d'Aubeterre"
  },
  assertContent: {}
});

// testGenerator({
//   title: "Setting an author name - Japanese",
//   command: "yo wupjs:config:author:name",
//   prompt: {
//     "config:author:name": "ルネ・デカルト"
//   },
//   assertContent: {}
// });
//
// testGenerator({
//   title: "Setting an author name - Chinese",
//   command: "yo wupjs:config:author:name",
//   prompt: {
//     "config:author:name": "艾薩克·牛頓"
//   },
//   assertContent: {}
// });
