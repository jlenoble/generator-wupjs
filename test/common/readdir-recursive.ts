import fs from "fs-extra";
import path from "path";

type Path = Wup.Path;

export default async function* readdirRecursive(
  dir: Path
): AsyncIterableIterator<Path> {
  for (const file of await fs.readdir(dir)) {
    const fullPath = path.join(dir, file);
    const stats = await fs.lstat(fullPath);

    if (stats.isDirectory()) {
      for await (const pth of readdirRecursive(fullPath)) {
        yield pth;
      }
    } else {
      yield fullPath;
    }
  }
}

export async function readdir(dir: Wup.Path): Promise<Path[]> {
  const files: Path[] = [];

  for await (const file of readdirRecursive(dir)) {
    files.push(file);
  }

  return files.map((file): Path => path.relative(dir, file));
}
