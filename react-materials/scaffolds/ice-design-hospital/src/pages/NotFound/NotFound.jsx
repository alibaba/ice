import React, { Component } from 'react';
import BasicNotFound from '../../components/BasicNotFound';

export default class NotFound extends Component {
  static displayName = 'NotFound';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ minHeight: '100vh' }}>
        <BasicNotFound />
      </div>
    );
  }
}
