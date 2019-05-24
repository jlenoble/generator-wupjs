import { expect } from "chai";
import AwesomeApp from "../../src/js/index";

describe("Testing AwesomeApp", () => {
  const defaultArgs = [];

  it("Class AwesomeApp can be instanciated", () => {
    expect(() => {
      new AwesomeApp(...defaultArgs);
    }).not.to.throw();
  });
});