import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import TopBar from '../../components/TopBar';

export default class Analysis extends Component {
  static displayName = 'Analysis';

  render() {
    return (
      <div>
        <TopBar title="数据统计" />
        <IceContainer>Analysis</IceContainer>
      </div>
    );
  }
}
