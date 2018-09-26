import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../ContainerTitle';
import DoubleAxesChart from './DoubleAxesChart';

export default class PercentageComplete extends Component {
  static displayName = 'PercentageComplete';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <IceContainer>
        <ContainerTitle title="完成效率" />
        <DoubleAxesChart />
      </IceContainer>
    );
  }
}
