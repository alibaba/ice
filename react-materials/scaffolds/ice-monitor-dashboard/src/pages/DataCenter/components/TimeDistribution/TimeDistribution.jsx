import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../ContainerTitle';
import RealtimeLineChart from './RealtimeLineChart';

export default class TimeDistribution extends Component {
  static displayName = 'TimeDistribution';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <IceContainer>
        <ContainerTitle title="耗时分布" />
        <RealtimeLineChart />
      </IceContainer>
    );
  }
}
