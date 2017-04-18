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

  it('creates a .yo-rc.json file', function () {
    assert.file('.yo-rc.json');
  });

  it('.yo-rc.json has the expected content', function () {
    assert.fileContent('.yo-rc.json', /"genVersion": "0.2.16"/);
    assert.fileContent('.yo-rc.json', /"created": "\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z"/);
    assert.fileContent('.yo-rc.json', /"updated": "\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z"/);

    assertContent.forEach(content => {
      assert.fileContent('.yo-rc.json', content);
    });
  });
});