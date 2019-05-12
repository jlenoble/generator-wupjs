type Options = Wup.Options;

export const configFiles: Options = {
  ".babelrc": true,
  ".eslintrc": true,
  ".gitignore": true
};

export const gulpFiles: Options = {
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

export const prompt: Options = {
  "config:author:name": "Me Me",
  "config:author:email": "me@example.com",
  "config:license": ["MIT"],
  "config:package:name": "awesome-app",
  "config:package:version": "1.2.3",
  "config:package:description": "Some dummy description",
  "config:package:keywords": "foo, bar, quux",
  "config:github:username": "me-me"
};

export default { configFiles, gulpFiles };
