import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../../../../components/ContainerTitle';
import LineChart from './LineChart';

export default class Trend extends Component {
  static displayName = 'Trend';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={{ padding: 0 }}>
        <ContainerTitle title="请求数量趋势" />
        <LineChart />
      </IceContainer>
    );
  }
}
