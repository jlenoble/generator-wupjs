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

export const gulpFiles: BoolOptions = {
  "gulpfile.js": true,
  "gulp/build.js": true,
  "gulp/clean.js": true,
  "gulp/test.js": true,
  "gulp/watch.js": true,
  "gulp/tdd.js": true,
  "gulp/lint.js": true,
  "gulp/dist-build.js": true,
  "gulp/dist-clean.js": true,
  "gulp/dist-test.js": true,
  "gulp/doc.js": true,
  "gulp/prepublish.js": true,
  "gulp/push.js": true,
  "gulp/todo.js": true,
};

export const docFiles: BoolOptions = {
  "docs/index.md": true,
  "docs/usage.md": true,
  "docs/examples/usage.test.js": true,
  "docs/license.md": true,
};

export const files = (ext: string, ext2?: string): BoolOptions => {
  return !ext2
    ? {
        [`src/awesome-app.${ext}`]: true,
        [`test/awesome-app.test.${ext}`]: true,
      }
    : {
        [`src/${ext}/awesome-app.${ext}`]: true,
        [`test/${ext}/awesome-app.test.${ext}`]: true,
        [`src/${ext2}/awesome-app.${ext2}`]: true,
        [`test/${ext2}/awesome-app.test.${ext2}`]: true,
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
