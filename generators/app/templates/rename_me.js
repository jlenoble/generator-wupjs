<% if(addons.includes('React')) { %>import React, {Component} from 'react';

export default class <%= Class %> extends Component {

  render() {
    return <h1>Hello!</h1>;
  }

}<% } else { %>export default class <%= Class %> {

  constructor() {
    console.log('Hello!');
  }

}<% } %>
