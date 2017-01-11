import path from 'path';
import upperCamelCase from 'uppercamelcase';
import {exec} from 'child-process-promise';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

const envFiles = [
  '.babelrc',
  '.gitignore',
  '.eslintrc',
  'package.json',
];

const gulpFiles = [
  'gulpfile.babel.js',
  'gulp/build.js',
  'gulp/clean.js',
  'gulp/dist.js',
  'gulp/globs.js',
  'gulp/prepublish.js',
  'gulp/tdd.js',
  'gulp/test.js',
  'gulp/watch.js'
];

const appFiles = [
  'LICENSE',
  'README.md'
];

describe('generator-wupjs:app', function() {

  describe('Testing with no argument', function() {

    before(function() {
      this.cwd = process.cwd();
      this.runContext = helpers.run(path.join(__dirname, '../../generators/app'))
        .withPrompts({
          description: 'Some fancy description',
          author: 'Me Me',
          email: 'me@there',
          github: 'me',
          license: 'GPL-3.0',
          addons: []
        })
        .toPromise();

      return this.runContext;
    });

    after(function() {
      process.chdir(this.cwd);
    });

    it('creates files', function() {
      assert.file(envFiles);
      assert.file(gulpFiles);
      assert.file(appFiles);
      this.runContext.then(dir => {
        const str = path.basename(dir);
        assert.file([`src/${str}.js`, `test/${str}.test.js`]);
      });
    });

    it('files have expected content', function() {
      assert.fileContent('package.json',
        /"description": "Some fancy description"/);
      assert.fileContent('package.json', /"name": "Me Me"/);
      assert.fileContent('package.json', /"email": "me@there"/);
      assert.fileContent('package.json', /"license": "GPL-3\.0"/);

      assert.fileContent('LICENSE', /GPL-3\.0 License/);
      assert.fileContent('LICENSE', /Copyright \(c\) \d+ Me Me <me@there>/);

      assert.fileContent('README.md', /Some fancy description/);
      assert.fileContent('README.md', /© \d+ \[Me Me\]\(mailto:me@there\)/);

      return this.runContext.then(dir => {
        let str = path.basename(dir);
        let Class;
        if (!/^[a-zA-Z]+.*/.test(str)) {
          Class = 'Wup' + str;
        } else {
          Class = upperCamelCase(str);
        }
        assert.fileContent('package.json', new RegExp(
          `"name": "${str}"`));
        assert.fileContent('package.json', new RegExp(
          `"url": "git://github\.com/me/${str}\.git"`));

        /*assert.fileContent('gulp/globs.js', new RegExp(
          `export const srcGlob = 'src/${str}\.js';`));*/

        assert.fileContent('README.md', new RegExp(`# ${str}`));
        assert.fileContent('README.md', new RegExp(
          `${str} is \\[GPL-3.0 licensed\\]\\(./LICENSE\\).`));

        assert.fileContent(`src/${str}.js`, new RegExp(
          `export default class ${Class}`));
        assert.fileContent(`test/${str}.test.js`, new RegExp(
          `import ${Class} from '../src/${str}';`));
      }).catch(err => {
        throw err;
      });
    });

    /*it(`'gulp test' runs Ok`, function() {
      this.timeout(500000);
      return this.runContext.then(dir => {
        return exec('npm install', {cwd: dir})
          .then(res => {
            return exec('gulp test', {cwd: dir});
          })
          .then(res => {
            console.log(res.stdout);
            console.warn(res.stderr);
          }, error => {
            console.error(error);
          });
      });
    });*/

  });

  describe('Testing with argument', function() {

    before(function() {
      this.cwd = process.cwd();
      return helpers.run(path.join(__dirname, '../../generators/app'))
        .withArguments(['MyApp'])
        .withPrompts({
          description: 'Some fancy description',
          author: 'Me Me',
          email: 'me@there',
          github: 'me',
          license: 'MIT',
          addons: []
        })
        .toPromise();
    });

    after(function() {
      process.chdir(this.cwd);
    });

    it('creates files', function() {
      assert.file(envFiles);
      assert.file(gulpFiles);
      assert.file(appFiles);
      assert.file(['src/MyApp.js', 'test/MyApp.test.js']);
    });

    it('files have expected content', function() {
      assert.fileContent('package.json', /"name": "MyApp"/);
      assert.fileContent('package.json',
        /"description": "Some fancy description"/);
      assert.fileContent('package.json',
        /"url": "git:\/\/github\.com\/me\/MyApp\.git"/);
      assert.fileContent('package.json', /"name": "Me Me"/);
      assert.fileContent('package.json', /"email": "me@there"/);
      assert.fileContent('package.json', /"license": "MIT"/);

      /*assert.fileContent('gulp/globs.js',
        /export const srcGlob = 'src\/MyApp\.js';/);*/

      assert.fileContent('LICENSE', /MIT License/);
      assert.fileContent('LICENSE', /Copyright \(c\) \d+ Me Me <me@there>/);

      assert.fileContent('README.md', /# MyApp/);
      assert.fileContent('README.md', /Some fancy description/);
      assert.fileContent('README.md',
        /MyApp is \[MIT licensed\]\(\.\/LICENSE\)\./);
      assert.fileContent('README.md', /© \d+ \[Me Me\]\(mailto:me@there\)/);

      assert.fileContent('src/MyApp.js', /export default class Myapp/);
      assert.fileContent('test/MyApp.test.js',
        /import Myapp from '\.\.\/src\/MyApp';/);
    });

  });

});
