

import React, { Component } from 'react';

import SuccessDetail from './components/SuccessDetail';

import './Result.scss';

export default class Result extends Component {
  static displayName = 'Result';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="result-page">
        <SuccessDetail />
      </div>
    );
  }
}
