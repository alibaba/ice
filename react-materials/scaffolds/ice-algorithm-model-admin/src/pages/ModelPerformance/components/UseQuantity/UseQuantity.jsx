import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../../../../components/ContainerTitle';
import GradientChart from './GradientChart';

export default class UseQuantity extends Component {
  static displayName = 'UseQuantity';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={{ padding: 0 }}>
        <ContainerTitle title="调用量" />
        <GradientChart />
      </IceContainer>
    );
  }
}
