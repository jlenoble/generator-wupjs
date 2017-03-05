<% if(addons.includes('Enzyme')) { %>import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

<% } %>import './<%= module %>.test';<% if(addons.includes('Enzyme')) { %>

chai.use(chaiEnzyme());<% } %>
