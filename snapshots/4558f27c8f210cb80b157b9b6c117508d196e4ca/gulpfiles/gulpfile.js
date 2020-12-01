/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require("gulp");

const hello = function () {
  for (let i = 0; i < 5; i++) {
    console.log(`Test message ${i}: Hello!`);
  }

  return Promise.resolve();
};

gulp.task("default", hello);
