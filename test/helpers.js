import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import Base from '../../generators/base';

export const testGenerator = (name, prompt = {}, assertContent = []) =>
describe(`generator-wupjs:${name}`, function () {
  before(function () {
    this.cwd = process.cwd();
    Base.reset();
    this.runContext = helpers
      .run(path.join(__dirname, `../../generators/${name}`))
      .withPrompts(prompt)
      .toPromise();

    return this.runContext;
  });

  after(function () {
    process.chdir(this.cwd);
  });

  const tests = {
    '.yo-rc.json': [
      /"genVersion": "0.2.16"/,
      /"created": "\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z"/,
      /"updated": "\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z"/,
    ],
  };

  if (Array.isArray(assertContent)) {
    tests['.yo-rc.json'] = tests['.yo-rc.json'].concat(assertContent);
  } else {
    Object.keys(assertContent).forEach(file => {
      tests[file] = tests[file] ? tests[file].concat(assertContent[file]) :
        assertContent[file];
    });
  }

  Object.keys(tests).forEach(file => {
    if (file[0] !== '!' && tests[file]) {
      it(`creates a ${file} file`, function () {
        assert.file(file);
      });

      tests[file].forEach(content => {
        it(`${file} has the expected content ${content}`, function () {
          assert.fileContent(file, content);
        });
      });
    } else {
      if (tests[file]) {
        tests[file].forEach(content => {
          const _file = file.substring(1);
          it(`${_file} has not the content ${content}`, function () {
            assert.noFileContent(_file, content);
          });
        });
      } else {
        it(`${file} is missing as expected`, function () {
          assert.noFile(file);
        });
      }
    }
  });
});
