import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import ContainerCard from '../../../../components/ContainerCard';
import RadarChart from './RadarChart';
import BrushChart from './BrushChart';

const { Row, Col } = Grid;

export default class Dashboard extends Component {
  render() {
    return (
      <ContainerCard>
        <Row wrap gutter="20">
          <Col l="8">
            <RadarChart />
          </Col>
          <Col l="16">
            <BrushChart />
          </Col>
        </Row>
      </ContainerCard>
    );
  }
}
