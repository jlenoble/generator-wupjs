import { expect } from "chai";
import Config from "../../generators/configure";

describe("Testing config", () => {
  it(`Method 'has' returns a boolean`, () => {
    const config = new Config();
    config.initialize();

    expect(config.has("author")).to.be.true;
    expect(config.has("dummy")).to.be.false;
  });

  it(`Method 'get' returns a string or undefined`, () => {
    const config = new Config();
    config.initialize();

    expect(config.get("author")).to.equal("Jason Lenoble");
    expect(config.get("dummy")).to.be.undefined;
  });
});
