import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import TopBar from '../../components/TopBar';

export default class Function extends Component {
  static displayName = 'Function';

  render() {
    return (
      <div>
        <TopBar title="函数管理" buttonText="添加函数" />
        <IceContainer>Function</IceContainer>
      </div>
    );
  }
}
