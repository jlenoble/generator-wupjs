import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import del from "del";
import conflict from "detect-conflict";
import { diffLines } from "diff";
import equiv from "./equiv";

export async function addMissingFilesToSnapshot(
  files: string[],
  snapshots: string[],
  scratchDir: string,
  hashDir: string
): Promise<void> {
  const hash = path.basename(hashDir);

  for (const file of snapshots) {
    if (!files.includes(file)) {
      console.log(
        chalk.yellow(
          `Adding missing ${file} to snapshot ${hash}, please review`
        )
      );
      await fs.copy(path.join(scratchDir, file), path.join(hashDir, file));
    }
  }
}

export async function createSnapshotIfMissing(
  scratchDir: string,
  hashDir: string
): Promise<void> {
  try {
    await fs.stat(hashDir);
  } catch (e) {
    const hash = path.basename(hashDir);
    console.log(chalk.yellow(`Creating snapshot ${hash}, please review`));
    await fs.copy(scratchDir, hashDir);
  }
}

export async function diffSnapshotFile(
  filename: string,
  hashDir: string
): Promise<string> {
  const snapshotFile = path.join(hashDir, filename);
  const snapshotBuffer = await fs.readFile(snapshotFile);

  let diffText = "";

  if (conflict(filename, snapshotBuffer)) {
    const textBuffer = await fs.readFile(filename);
    const diff = diffLines(
      equiv(snapshotBuffer.toString()),
      equiv(textBuffer.toString())
    );

    if (diff.some((line): boolean => !(!line.added && !line.removed))) {
      diff.forEach((line): void => {
        const color = line.added ? "green" : line.removed ? "red" : "white";
        diffText += chalk[color](line.value);
      });
    }
  }

  return diffText;
}

export async function removeUnexpectedFilesFromSnapshot(
  files: string[],
  snapshots: string[],
  hashDir: string
): Promise<void> {
  const hash = path.basename(hashDir);

  for (const file of files) {
    if (!snapshots.includes(file)) {
      console.log(
        chalk.yellow(
          `Removing unexpected ${file} from snapshot ${hash}, please review`
        )
      );

      await del(path.join(hashDir, file), { force: true });
    }
  }
}
