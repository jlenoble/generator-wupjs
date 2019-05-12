export const configFiles: Wup.Options = {
  ".babelrc": true,
  ".eslintrc": true,
  ".gitignore": true
};

export const gulpFiles: Wup.Options = {
  "gulpfile.babel.js": true,
  "gulp/build.js": true,
  "gulp/clean.js": true,
  "gulp/test.js": true,
  "gulp/watch.js": true,
  "gulp/tdd.js": true,
  "gulp/lint.js": true,
  "gulp/dist-build.js": true,
  "gulp/dist-clean.js": true
};

export default { configFiles, gulpFiles };
