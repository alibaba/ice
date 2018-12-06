import React, { Component } from 'react';
import Table from './conponents/Table';

export default class History extends Component {
  static displayName = 'History';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="history-page" >
        <Table />
      </div>
    );
  }
}
