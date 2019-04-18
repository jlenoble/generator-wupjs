import { expect } from "chai";

export function assertSameFileNames(files1: string[], files2: string[]): void {
  expect(files1).to.have.length(files2.length);
  expect([...new Set([...files1, ...files2])]).to.have.length(files2.length);
}
