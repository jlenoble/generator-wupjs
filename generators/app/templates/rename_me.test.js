import Muter, {captured} from 'muter';
import {expect} from 'chai';
import <%= Class %> from '../src/<%= module %>';

describe('Testing <%= Class %>', function() {

  const muter = Muter(console, 'log');

  it(`Class <%= Class %> says 'Hello!'`, captured(muter, function() {
    new <%= Class %>();
    expect(muter.getLogs()).to.equal('Hello!\n');
  }));

});
