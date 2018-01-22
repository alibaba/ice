import React, { Component } from 'react';
import BasicException from './components/BasicException';
import './ServerError.scss';

export default class ServerError extends Component {
  static displayName = 'ServerError';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="server-error-page">

        <BasicException />

      </div>
    );
  }
}
