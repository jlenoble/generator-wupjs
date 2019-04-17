/* eslint-disable no-invalid-this */

import fs from "fs-extra";
import path from "path";
import del from "del";
import assert from "yeoman-assert";
import "./run-context"; // Side-effects: Overwrites DummyPrompt.prototype.run
// and RunContext.prototype._run
import helpers from "yeoman-test";
import parseArgs from "minimist";
import objectHash from "object-hash";
import chalk from "chalk";
import conflict from "detect-conflict";
import { diffLines } from "diff";
import { expect } from "chai";
import defineTests from "./define-tests";

type Options = Wup.Options;

const testGenerator = (_options: {
  title: string;
  command: string;
  prompt: Options;
  assertContent: { [file: string]: RegExp[] | true };
}): void => {
  const title = _options.title;
  const command = _options.command;
  const parsed = parseArgs(_options.command.split(/\s+/));
  const [, _name, ...args] = parsed._;
  const match = _name.match(/wupjs:([-\w.:]+)/);
  const name = match && match[1];

  // Provide a global config dir specific to the tests to load defaults from
  process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../config");

  describe(title, function(): void {
    const prompt: Options = Object.assign({}, _options.prompt);
    const scratchDir = path.join(__dirname, "../../../scratch");
    const snapshotDir = path.join(__dirname, "../../../snapshots");
    const hash = objectHash(Object.assign({ command }, prompt));
    const hashDir = path.join(snapshotDir, hash);

    this.timeout(5000);

    before(function(): Promise<void> {
      this.cwd = process.cwd();

      this.end = new Promise(
        (resolve, reject): void => {
          this.runContext = helpers
            .run(path.join(__dirname, `../../../generators/${name}`), {
              tmpdir: false
            })
            .inDir(scratchDir)
            .withArguments(args)
            .withPrompts(prompt)
            .on(
              "ready",
              // We don't want to import any source statically, so can't import
              // type BaseGenerator
              // @ts-ignore
              (generator): void => {
                // .yo-rc.json is in topdir and yeoman-test silently resets
                // cwd to topdir (because of sinonjs masking the warning)
                // so override the reset
                generator.destinationRoot(scratchDir);

                // Also override the reset for every single subgen
                // @ts-ignore
                generator._composedWith.forEach(
                  // We don't want to import any source statically, so can't import
                  // type BaseGenerator
                  // @ts-ignore
                  (gen): void => {
                    gen.destinationRoot(scratchDir);
                  }
                );
              }
            )
            .on("end", resolve)
            .on("error", reject)
            .toPromise();
        }
      );

      return this.runContext;
    });

    after(function(): void {
      return this.end.then(
        (): void => {
          process.chdir(this.cwd);
          // Dynamic loading because the config package is linked
          // statically via common/config.ts so it can't acknowledge the
          // redefinition of process.env["NODE_CONFIG_DIR"] if any src is
          // linked statically (they all import indirectly common/config.ts)
          require("../../../generators/common/base-generator").reset();
        }
      );
    });

    const assertContent = Object.assign(
      {
        "package.json": true,
        LICENSE: true
      },
      _options.assertContent
    );

    const { tests, snapshots } = defineTests(assertContent);

    it("creates only the expected files", async (): Promise<void> => {
      let files = await fs.readdir(scratchDir);
      const keys = new Set(
        Object.keys(tests).map(
          (key): string => (key[0] === "!" ? key.substring(1) : key)
        )
      );

      expect(files).to.have.length(keys.size);
      expect([...new Set([...keys, ...files])]).to.have.length(keys.size);

      try {
        await fs.stat(hashDir);
      } catch (e) {
        console.log(chalk.yellow(`Creating snapshot ${hash}, please review`));
        await fs.copy(scratchDir, hashDir);
      }

      files = await fs.readdir(hashDir);

      try {
        expect(files).to.have.length(keys.size);
        expect([...new Set([...keys, ...files])]).to.have.length(keys.size);
      } catch (e) {
        if (process.argv.includes("--update-snapshots")) {
          for (const file of files) {
            if (!keys.has(file)) {
              console.log(
                chalk.yellow(
                  `Removing ${file} from snapshot ${hash}, please review`
                )
              );
              await del(path.join(hashDir, file));
            }
          }

          for (const key of keys) {
            if (!files.includes(key)) {
              console.log(
                chalk.yellow(`Adding ${key} to snapshot ${hash}, please review`)
              );
              await fs.copy(
                path.join(scratchDir, key),
                path.join(hashDir, key)
              );
            }
          }
        } else {
          throw e;
        }
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
            // File has a snapshot to be compare with
            const snapshotFile = path.join(hashDir, file);

            it(`  ${file} has the expected content ${path.join(
              path.relative(snapshotDir, hashDir),
              file
            )}`, async (): Promise<void> => {
              const snapshot = await fs.readFile(snapshotFile);

              if (conflict(file, snapshot)) {
                const text = await fs.readFile(file);
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

                if (process.argv.includes("--update-snapshots")) {
                  console.log(`
Updating snapshot:
${diffText}
`);
                  await fs.copy(file, snapshotFile);
                } else {
                  throw new Error(diffText);
                }
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
  });
};

export default testGenerator;
