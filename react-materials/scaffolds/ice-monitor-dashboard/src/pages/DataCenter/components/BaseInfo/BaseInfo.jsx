import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import ContainerTitle from '../ContainerTitle';
import GenderPieChart from './GenderPieChart';
import DevicePieChart from './DevicePieChart';

const { Row, Col } = Grid;

export default class BaseInfo extends Component {
  static displayName = 'BaseInfo';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <IceContainer>
        <ContainerTitle title="基本信息" />
        <Row>
          <Col l="12">
            <GenderPieChart />
          </Col>
          <Col l="12">
            <DevicePieChart />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}
