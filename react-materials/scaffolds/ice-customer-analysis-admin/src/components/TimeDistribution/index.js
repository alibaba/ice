import React, { Component } from 'react';
import { DatePicker } from '@alifd/next';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../ContainerTitle';
import AreaChart from './AreaChart';

export default class TimeDistribution extends Component {
  static displayName = 'TimeDistribution';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <ContainerTitle
          title={this.props.title}
          extraAfter={
            <DatePicker onChange={(val, str) => console.log(val, str)} />
          }
        />
        <AreaChart />
      </IceContainer>
    );
  }
}
