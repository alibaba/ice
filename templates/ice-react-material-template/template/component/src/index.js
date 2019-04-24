import React, { Component } from 'react';

export default class <%= className %> extends Component {
  static displayName = '<%= className %>';

  render() {
    return (
      <div className="<%= name %>">Hello <%= className %></div>
    );
  }
}
