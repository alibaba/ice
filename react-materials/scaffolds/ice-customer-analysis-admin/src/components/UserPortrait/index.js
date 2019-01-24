import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../ContainerTitle';
import GenderChart from './GenderChart';
import AgeChart from './AgeChart';

const { Row, Col } = Grid;

export default class UserPortrait extends Component {
  render() {
    return (
      <IceContainer>
        <ContainerTitle title="用户画像" />
        <Row wrap gutter="20">
          <Col l="12">
            <GenderChart />
          </Col>
          <Col l="12">
            <AgeChart />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}
