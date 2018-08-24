import React, { Component } from 'react';

import BuilderTable from './components/BuilderTable';

export default class Builder extends Component {
  static displayName = 'Builder';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <BuilderTable />
      </div>
    );
  }
}
