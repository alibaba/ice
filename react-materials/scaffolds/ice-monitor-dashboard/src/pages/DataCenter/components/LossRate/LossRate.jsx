import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../ContainerTitle';
import ColumnChart from './ColumnChart';

export default class LossRate extends Component {
  static displayName = 'LossRate';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <IceContainer>
        <ContainerTitle title="流失率" />
        <ColumnChart />
      </IceContainer>
    );
  }
}
