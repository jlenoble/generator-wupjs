import Muter from 'muter';
import {expect} from 'chai';
import <%= Class %> from '../src/<%= module %>';

describe('Testing <%= Class %>', function() {

  it(`Class <%= Class %> says 'Hello!'`, function() {
    const muter = Muter(console, 'log');
    muter.capture();
    new <%= Class %>();
    expect(muter.getLogs()).to.equal('Hello!\n');
    muter.uncapture();
  });

});
