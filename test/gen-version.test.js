import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

describe('generator-wupjs:gen-version', function () {
  before(function () {
    this.cwd = process.cwd();
    this.runContext = helpers
      .run(path.join(__dirname, '../../generators/gen-version'))
      .toPromise();

    return this.runContext;
  });

  after(function () {
    process.chdir(this.cwd);
  });

  it('creates a .yo-rc.json file', function () {
    assert.file('.yo-rc.json');
  });

  it('.yo-rc.json has the expected content', function () {
    assert.fileContent('.yo-rc.json', /"genVersion": "0.2.16"/);
  });
});
