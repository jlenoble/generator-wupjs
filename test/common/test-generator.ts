/* eslint-disable no-invalid-this */

import fs from "fs-extra";
import path from "path";
import assert from "yeoman-assert";
import "./run-context"; // Side-effects: Overwrites DummyPrompt.prototype.run
// and RunContext.prototype._run
import helpers from "yeoman-test";
import parseArgs from "minimist";
import objectHash from "object-hash";
import chalk from "chalk";
import extractTestParameters from "./extract-test-parameters";
import { readdir } from "./readdir-recursive";
import { assertSameFileNames } from "./assert";
import {
  addMissingFilesToSnapshot,
  diffSnapshotFile,
  createSnapshotIfMissing,
  removeUnexpectedFilesFromSnapshot,
} from "./snapshots";

type Options = Wup.Options;

const testGenerator = (_options: {
  title: string;
  command: string;
  prompt?: Options;
  assertContent?: { [file: string]: RegExp[] | (() => RegExp[]) | true };
  expectInvalid?: string[];
}): void => {
  const title = _options.title;
  const command = _options.command;
  const parsed = parseArgs(_options.command.split(/\s+/));
  const [, _name, ...args] = parsed._;
  const match = _name.match(/wupjs:([-\w.:]+)/);
  const name = (match && match[1]) || "app";

  // Provide a global config dir specific to the tests to load defaults from
  process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "../config");

  describe(title, function (): void {
    const prompt: Options = Object.assign({}, _options.prompt);
    const scratchDir = path.join(__dirname, "../../../scratch");
    const snapshotDir = path.join(__dirname, "../../../snapshots");
    const hash = objectHash(Object.assign({ command }, prompt));
    const hashDir = path.join(snapshotDir, hash);

    this.timeout(10000);

    before(function (): Promise<void> {
      this.cwd = process.cwd();

      this.end = new Promise((resolve, reject): void => {
        this.runContext = helpers
          .run(path.join(__dirname, `../../../generators/${name}`), {
            tmpdir: false,
          })
          .inDir(scratchDir)
          .withArguments(args)
          .withPrompts(prompt)
          .on(
            "ready",
            // We don't want to import any source statically, so can't import
            // type BaseGenerator
            (generator): void => {
              // .yo-rc.json is in topdir and yeoman-test silently resets
              // cwd to topdir (because of sinonjs masking the warning)
              // so override the reset
              generator.destinationRoot(scratchDir);

              // Also override the reset for every single subgen
              generator._composedWith.forEach(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore We don't want to import any source statically, so can't import type BaseGenerator
                (gen): void => {
                  gen.destinationRoot(scratchDir);
                }
              );
            }
          )
          .on("end", resolve)
          .on("error", reject)
          .toPromise();
      });

      return this.runContext;
    });

    after(function (): void {
      return this.end.then((): void => {
        process.chdir(this.cwd);
        // Dynamic loading because the config package is linked
        // statically via common/config.ts so it can't acknowledge the
        // redefinition of process.env["NODE_CONFIG_DIR"] if any src is
        // linked statically (they all import indirectly common/config.ts)
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("../../../generators/common/base-generator").reset();
      });
    });

    const assertContent = Object.assign(
      {
        "package.json": true,
        LICENSE: true,
        "README.md": false,
      },
      _options.assertContent
    );

    Object.keys(assertContent).forEach((key): void => {
      if (typeof assertContent[key] === "function") {
        assertContent[key] = (assertContent[key] as Function)();
      }
    });

    const invalidFiles = (_options.expectInvalid || []).concat();

    const {
      matchFiles,
      snapshotFiles,
      expectedFiles,
      noFiles,
    } = extractTestParameters(
      assertContent as {
        [k: string]: RegExp[] | true;
      }
    );

    const validInput = invalidFiles.length === 0;

    if (validInput) {
      it("should create only the expected files", async (): Promise<void> => {
        let files = await readdir(scratchDir);

        assertSameFileNames(files, expectedFiles);

        await createSnapshotIfMissing(scratchDir, hashDir);

        files = await readdir(hashDir);

        try {
          assertSameFileNames(files, expectedFiles);
        } catch (e) {
          if (process.argv.includes("--update-snapshots")) {
            await Promise.all([
              addMissingFilesToSnapshot(
                files,
                expectedFiles,
                scratchDir,
                hashDir
              ),
              removeUnexpectedFilesFromSnapshot(files, expectedFiles, hashDir),
            ]);
          } else {
            throw new Error(
              chalk.red(`
Unexpected or missing file(s) in snapshot directory ${chalk.yellow(
                hash
              )}, please review.
If this is fine, you can update your snapshot with: gulp update-snapshots
`)
            );
          }
        }
      });
    }

    const filter = (file: string): boolean => {
      return !invalidFiles.includes(file);
    };

    expectedFiles.filter(filter).forEach((file): void => {
      it(`should create a ${file} file`, (): void => {
        assert.file(file);
      });
    });

    noFiles.filter(filter).forEach((file): void => {
      it(`shouldn't create a ${file} file`, (): void => {
        assert.noFile(file);
      });
    });

    Object.keys(matchFiles).forEach((file): void => {
      const tag = invalidFiles.includes(file) ? "error" : "content";

      if (file[0] !== "!") {
        (matchFiles[file] as RegExp[]).forEach((content): void => {
          it(`${file} has the expected ${tag} ${content}`, (): void => {
            assert.fileContent(file, content);
          });
        });
      } else {
        (matchFiles[file] as RegExp[]).forEach((content): void => {
          const _file = file.substring(1);
          it(`${_file} has not the ${tag} ${content}`, (): void => {
            assert.noFileContent(_file, content);
          });
        });
      }
    });

    if (validInput) {
      snapshotFiles.forEach((file): void => {
        const snapshotFile = path.join(hashDir, file);
        const filename = path.join(path.relative(snapshotDir, hashDir), file);

        it(`${file} has the expected content ${filename}`, async (): Promise<void> => {
          const diffText = await diffSnapshotFile(file, hashDir);

          if (diffText !== "") {
            if (process.argv.includes("--update-snapshots")) {
              console.log(`
Updating snapshot ${filename}:
${diffText}
`);
              await fs.copy(file, snapshotFile);
            } else {
              throw new Error(diffText);
            }
          }
        });
      });
    }
  });
};

export default testGenerator;
