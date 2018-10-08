import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import TopBar from '../../components/TopBar';

export default class Generalization extends Component {
  static displayName = 'Generalization';

  render() {
    return (
      <div>
        <TopBar title="泛化规则管理（Generalization）" buttonText="新建规则" />
        <IceContainer>Generalization</IceContainer>
      </div>
    );
  }
}
