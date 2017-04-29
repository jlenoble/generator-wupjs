import {testGenerator} from './helpers';

testGenerator('write-gulp-doc', {
  name: 'MyModule',
  description: 'Some description',
  author: 'Me Me',
  email: 'me@there',
  license: 'GPL-3.0',
}, {
  'gulp/doc.js': [
    /const docConf = 'markdown.json';/,
    /const examplesGlob = \[/,
    /  'docs\/examples\/\*\*\/\*\.test\.js'/,
    /const buildDir = 'build'/,
    /\.pipe\(wrap\('```js\\n<%= contents %>```', \{\}, \{parse: false\}\)\)/,
  ],
  'package.json': [
    /"markdown-include": "\*"/,
    /"gulp-replace": "\*"/,
    /"gulp-rename": "\*"/,
    /"gulp-wrap": "\*"/,
  ],
  'gulpfile.babel.js': [
    /import '\.\/gulp\/doc';/,
  ],
  'markdown.json': [
    /"heading": "# MyModule\\n\\nSome description"/,
  ],
  'docs/index.md': [
    /MyModule is \[GPL-3.0 licensed\]\(\.\/LICENSE\)\./,
    /© 20\d\d \[Me Me\]\(mailto:me\@there\)/,
  ],
});
