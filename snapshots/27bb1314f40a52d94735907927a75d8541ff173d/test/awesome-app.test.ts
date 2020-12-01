import { expect } from "chai";
import AwesomeApp from "../src/awesome-app";

describe("Testing AwesomeApp", (): void => {
  const defaultArgs = [];

  it("Class AwesomeApp can be instanciated", (): void => {
    expect(
      (): void => {
        new AwesomeApp(...defaultArgs);
      }
    ).not.to.throw();
  });
});
