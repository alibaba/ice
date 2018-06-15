import React, { Component } from 'react';
import Filter from './components/Filter';
import Content from './components/Content';

export default class TestManagement extends Component {
  static displayName = 'TestManagement';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Filter />
        <Content />
      </div>
    );
  }
}
