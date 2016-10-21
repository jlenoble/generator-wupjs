<% if(addons.includes('React')) { %>import React from 'react';
import {render} from 'react-dom';
<% } %>import <%= Class %> from './<%= module %>';
<% if(addons.includes('React')) { %>
render(<<%= Class %>/>, document.getElementById('app'));<% } else { %>
new <%= Class %>();<% } %>
