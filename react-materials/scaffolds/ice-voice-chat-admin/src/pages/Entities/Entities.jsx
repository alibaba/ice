import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import TopBar from '../../components/TopBar';

export default class Entities extends Component {
  static displayName = 'Entities';

  render() {
    return (
      <div>
        <TopBar title="实体管理（Entities）" buttonText="新建实体" />
        <IceContainer>Entities</IceContainer>
      </div>
    );
  }
}
