import React, { Component } from 'react';
import DataAnalysis from './components/DataAnalysis';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home">
        <DataAnalysis />
      </div>
    );
  }
}
