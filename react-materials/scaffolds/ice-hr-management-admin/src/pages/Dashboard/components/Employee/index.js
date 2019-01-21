import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import Performance from './Performance';
import Structure from './Structure';

const { Row, Col } = Grid;

export default class Overview extends Component {
  render() {
    return (
      <Row wrap gutter="20">
        <Col l="17">
          <Performance />
        </Col>
        <Col l="7">
          <Structure />
        </Col>
      </Row>
    );
  }
}
