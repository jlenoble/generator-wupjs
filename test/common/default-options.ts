interface StringOptions {
  [k: string]: string | string[];
}

interface BoolOptions {
  [k: string]: true;
}

export const configFiles: BoolOptions = {
  ".babelrc": true,
  ".eslintrc": true,
  ".gitignore": true,
  "markdown.json": true,
};

export const gulpFiles = (ext = "js"): BoolOptions => ({
  "gulpfile.js": true,
  [`gulp/build.${ext}`]: true,
  [`gulp/clean.${ext}`]: true,
  [`gulp/test.${ext}`]: true,
  [`gulp/watch.${ext}`]: true,
  [`gulp/tdd.${ext}`]: true,
  [`gulp/lint.${ext}`]: true,
  [`gulp/dist-build.${ext}`]: true,
  [`gulp/dist-clean.${ext}`]: true,
  [`gulp/dist-test.${ext}`]: true,
  [`gulp/doc.${ext}`]: true,
  [`gulp/prepublish.${ext}`]: true,
  [`gulp/push.${ext}`]: true,
  [`gulp/todo.${ext}`]: true,
});

export const docFiles = (ext = "js"): BoolOptions => ({
  "docs/index.md": true,
  "docs/usage.md": true,
  [`docs/examples/usage.test.${ext}`]: true,
  "docs/license.md": true,
});

export const files = (ext: string, ext2?: string): BoolOptions => {
  return !ext2
    ? {
        [`src/awesome-app.${ext}`]: true,
        [`test/awesome-app.test.${ext}`]: true,
      }
    : {
        [`src/awesome-app.${ext}`]: true,
        [`test/awesome-app.test.${ext}`]: true,
        [`src/awesome-app.${ext2}`]: true,
        [`test/awesome-app.test.${ext2}`]: true,
      };
};

export const prompt: StringOptions = {
  "config:author:name": "Me Me",
  "config:author:email": "me@example.com",
  "config:license": ["MIT"],
  "config:package:name": "awesome-app",
  "config:package:version": "1.2.3",
  "config:package:description": "Some dummy description",
  "config:package:keywords": "foo, bar, quux",
  "config:github:username": "me-me",
};

export default { configFiles, gulpFiles };
