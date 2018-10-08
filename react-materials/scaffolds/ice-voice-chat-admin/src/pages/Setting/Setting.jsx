import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import TopBar from '../../components/TopBar';

export default class Setting extends Component {
  static displayName = 'Setting';

  render() {
    return (
      <div>
        <TopBar title="基本设置" />
        <IceContainer>Setting</IceContainer>
      </div>
    );
  }
}
