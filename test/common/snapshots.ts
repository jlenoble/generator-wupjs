import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import del from "del";

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

export async function removeMissingFilesFromSnapshot(
  files: string[],
  snapshots: string[],
  hashDir: string
): Promise<void> {
  const hash = path.basename(hashDir);

  for (const file of files) {
    if (!snapshots.includes(file)) {
      console.log(
        chalk.yellow(
          `Removing missing ${file} from snapshot ${hash}, please review`
        )
      );

      await del(path.join(hashDir, file), { force: true });
    }
  }
}
