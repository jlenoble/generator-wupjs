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

// testGenerator({
//   title: "Setting an author name - Japanese",
//   command: "yo wupjs:config:author:name",
//   prompt: {
//     "config:author:name": "ルネ・デカルト"
//   }
// });
//
// testGenerator({
//   title: "Setting an author name - Chinese",
//   command: "yo wupjs:config:author:name",
//   prompt: {
//     "config:author:name": "艾薩克·牛頓"
//   }
// });
