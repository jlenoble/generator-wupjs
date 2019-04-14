/* eslint-disable no-invalid-this */

import path from "path";
import assert from "yeoman-assert";
import helpers from "yeoman-test";
import parseArgs from "minimist";

type Options = Wup.Options;

const testGenerator = (_options: {
  command: string;
  prompt: Options;
  globalConfig: Options;
  assertContent: { [file: string]: RegExp[] | true };
}): void => {
  const parsed = parseArgs(_options.command.split(/\s+/));
  const [, _name, ...args] = parsed._;
  const match = _name.match(/wupjs:([\w:]+)/);
  const name = match && match[1];

  describe(
    _options.command,
    (): void => {
      const prompt: Options = Object.assign({}, _options.prompt);

      before(function(): Promise<void> {
        this.cwd = process.cwd();

        this.runContext = helpers
          .run(path.join(__dirname, `../../../generators/${name}`), {
            tmpdir: false
          })
          .inDir("scratch")
          .cd("scratch")
          .withArguments(args)
          .withPrompts(prompt)
          .toPromise();

        return this.runContext;
      });

      after(function(): void {
        process.chdir(this.cwd);
      });

      const tests: { [k: string]: RegExp[] | true } = {
        ".yo-rc.json": [
          /"createdWith": "\d+\.\d+\.\d+"/,
          /"modifiedWith": "\d+\.\d+\.\d+"/,
          /"createdOn": "\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z"/,
          /"modifiedOn": "\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z"/
        ]
      };

      const assertContent = _options.assertContent;

      if (Array.isArray(assertContent)) {
        tests[".yo-rc.json"] = (tests[".yo-rc.json"] as RegExp[]).concat(
          assertContent
        );
      } else {
        Object.keys(assertContent).forEach(
          (file: string): void => {
            tests[file] = Array.isArray(tests[file])
              ? (tests[file] as RegExp[]).concat(
                  Array.isArray(assertContent[file])
                    ? (assertContent[file] as RegExp[])
                    : []
                )
              : assertContent[file];
          }
        );
      }

      Object.keys(tests).forEach(
        (file): void => {
          if (file[0] !== "!" && tests[file]) {
            // File exists and it matches a specified content or a snapshot
            it(`creates a ${file} file`, (): void => {
              assert.file(file);
            });

            if (tests[file] !== true) {
              // File matches a specified content
              (tests[file] as RegExp[]).forEach(
                (content): void => {
                  it(`${file} has the expected content ${content}`, (): void => {
                    assert.fileContent(file, content);
                  });
                }
              );
            } else {
              // File matches a snapshot
              throw new Error("path to file needed");
            }
          } else {
            // File doesn't exist, or has not a specified content, or differs from a snapshot
            if (tests[file]) {
              // File exists but has not a specified content or differs from a snapshot
              if (tests[file] !== true) {
                // File must not have a specified content
                (tests[file] as RegExp[]).forEach(
                  (content): void => {
                    const _file = file.substring(1);
                    it(`${_file} has not the content ${content}`, (): void => {
                      assert.noFileContent(_file, content);
                    });
                  }
                );
              } else {
                // File must differ from a snapshot
                throw new Error("path to file needed");
              }
            } else if (file[0] !== "!") {
              // File doesn't exist
              it(`${file} is missing as expected`, (): void => {
                assert.noFile(file);
              });
            } else {
              throw new Error(`{${file}: falsy} is meaningless`);
            }
          }
        }
      );
    }
  );
};

export default testGenerator;
