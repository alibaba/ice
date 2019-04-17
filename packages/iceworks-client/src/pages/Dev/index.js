import React, { Component } from 'react';
import { Button } from '@alifd/next';

export default class Dev extends Component {
  state = {};

  render() {
    return (
      <div>
        <Button type="primary">Start Dev</Button>
        <div>log...</div>
      </div>
    );
  }
}
