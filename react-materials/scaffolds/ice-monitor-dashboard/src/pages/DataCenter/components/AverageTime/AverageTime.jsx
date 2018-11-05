import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../ContainerTitle';
import RegionFilterRealtime from './RegionFilterRealtime';

export default class AverageTime extends Component {
  static displayName = 'AverageTime';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <IceContainer>
        <ContainerTitle title="平均时长分布" />
        <RegionFilterRealtime />
      </IceContainer>
    );
  }
}
