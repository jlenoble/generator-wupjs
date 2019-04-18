import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

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
