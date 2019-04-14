/* eslint-disable no-invalid-this */

import fs from "fs-extra";
import path from "path";
import assert from "yeoman-assert";
import helpers from "yeoman-test";
import parseArgs from "minimist";
import objectHash from "object-hash";
import chalk from "chalk";
import conflict from "detect-conflict";
import { diffLines } from "diff";
import BaseGenerator from "../../src/common/base-generator";
import { expect } from "chai";

type Options = Wup.Options;

const testGenerator = (_options: {
  command: string;
  prompt: Options;
  assertContent: { [file: string]: RegExp[] | true };
}): void => {
  const command = _options.command;
  const parsed = parseArgs(_options.command.split(/\s+/));
  const [, _name, ...args] = parsed._;
  const match = _name.match(/wupjs:([\w:]+)/);
  const name = match && match[1];

  // Provide a global config dir specific to the tests to load defaults from
  process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../config");

  describe(
    command,
    (): void => {
      const prompt: Options = Object.assign({}, _options.prompt);
      const scratchDir = path.join(__dirname, "../../../scratch");
      const snapshotDir = path.join(__dirname, "../../../snapshots");
      const hash = objectHash(Object.assign({ command }, prompt));
      const hashDir = path.join(snapshotDir, hash);

      before(function(): Promise<void> {
        this.cwd = process.cwd();
        this.runContext = helpers
          .run(path.join(__dirname, `../../../generators/${name}`), {
            tmpdir: false
          })
          .inDir(scratchDir)
          .withArguments(args)
          .withPrompts(prompt)
          .on(
            "ready",
            (generator: BaseGenerator): void => {
              // .yo-rc.json is in topdir and yeoman-test silently resets
              // cwd to topdir (because of sinonjs masking the warning)
              // so override the reset
              generator.destinationRoot(scratchDir);

              // Also override the reset for every single subgen
              // @ts-ignore
              generator._composedWith.forEach(
                (gen: BaseGenerator): void => {
                  gen.destinationRoot(scratchDir);
                }
              );
            }
          )
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

      it("creates only the expected files", (): void => {
        const files = fs.readdirSync(scratchDir);
        const keys = new Set(
          Object.keys(tests).map(
            (key): string => (key[0] === "!" ? key.substring(1) : key)
          )
        );

        expect(files).to.have.length(keys.size);
        expect([...new Set([...keys, ...files])]).to.have.length(keys.size);

        try {
          fs.statSync(hashDir);
        } catch (e) {
          console.log(chalk.yellow(`Creating snapshot ${hash}, please review`));
          fs.copySync(scratchDir, hashDir);
        }
      });

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
                  it(`  ${file} has the expected content ${content}`, (): void => {
                    assert.fileContent(file, content);
                  });
                }
              );
            } else {
              const snapshotFile = path.join(hashDir, file);

              it(`  ${file} has the expected content ${path.join(
                path.relative(snapshotDir, hashDir),
                file
              )}`, (): void => {
                const snapshot = fs.readFileSync(snapshotFile);

                if (conflict(file, snapshot)) {
                  const text = fs.readFileSync(file);
                  const diff = diffLines(snapshot.toString(), text.toString());

                  let diffText = "";

                  diff.forEach(
                    (line): void => {
                      const color = line.added
                        ? "green"
                        : line.removed
                        ? "red"
                        : "white";
                      diffText += chalk[color](line.value);
                    }
                  );

                  throw new Error(diffText);
                }
              });
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
                    it(`  ${_file} has not the content ${content}`, (): void => {
                      assert.noFileContent(_file, content);
                    });
                  }
                );
              } else {
                // File must differ from a snapshot
                throw new Error("path to file needed");
              }
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
