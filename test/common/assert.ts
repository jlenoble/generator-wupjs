import { expect } from "chai";

export function assertSameFileNames(files1: string[], files2: string[]): void {
  try {
    expect(files1).to.have.length(files2.length);
    expect([...new Set([...files1, ...files2])]).to.have.length(files2.length);
  } catch (e) {
    throw new Error(
      `Files in scratchDir
${JSON.stringify(files1.sort(), undefined, 2)}, but expected
${JSON.stringify(files2.sort(), undefined, 2)}`
    );
  }
}
