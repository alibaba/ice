import React, { Component } from 'react';
import FliterTable from './components/FilterTable';

export default class Query extends Component {
  static displayName = 'Query';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="query-page">
        <FliterTable />
      </div>
    );
  }
}
