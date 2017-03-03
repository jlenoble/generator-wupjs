<% if(addons.includes('React')) { %>import React from 'react';
<% if(addons.includes('Enzyme')) { %>import {shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';<% } else { %>
import TestUtils from 'react-addons-test-utils';<% } %>
<% } else { %>import Muter, {captured} from 'muter';
<% } %>import {expect} from 'chai';
import <%= Class %> from '../src/<%= module %>';
<% if(addons.includes('Enzyme')) { %>
chai.use(chaiEnzyme());<% } %>
<% if(addons.includes('React')) { %>
describe('Testing <<%= Class %>/>', function () {
  it(`Component <<%= Class %>/> says 'Hello!'`, function () {<% if(addons.includes('Enzyme')) { %>
    const wrapper = shallow(
      <<%= Class %>/>
    );

    expect(wrapper.find('h1').text()).to.equal('Hello!');<% } else { %>
    const component = TestUtils.renderIntoDocument(<<%= Class %>/>);
    const h1 = TestUtils.findRenderedDOMComponentWithTag(
      component, 'h1');

    expect(h1.textContent).to.equal('Hello!');<% } %>
  });
});<% } else { %>
describe('Testing <%= Class %>', function () {
  const muter = Muter(console, 'log');

  it(`Class <%= Class %> says 'Hello!'`, captured(muter, function () {
    new <%= Class %>();
    expect(muter.getLogs()).to.equal('Hello!\n');
  }));
});<% } %>
