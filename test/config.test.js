import {expect} from 'chai';
import Config from '../../generators/config';

describe('Testing config', function () {
  it(`Method 'has' returns a boolean`, function () {
    const config = new Config();

    expect(config.has('author')).to.be.true;
    expect(config.has('dummy')).to.be.false;
  });

  it(`Method 'get' returns a string or undefined`, function () {
    const config = new Config();

    expect(config.get('author')).to.equal('Jason Lenoble');
    expect(config.get('dummy')).to.be.undefined;
  });

  it(`Method 'set' registers changed properties`, function () {
    const config = new Config();
    expect(config.changedProperties).to.eql([]);

    config.set('author', 'Billy Bob');
    expect(config.changedProperties).to.eql(['author']);
  });
});
