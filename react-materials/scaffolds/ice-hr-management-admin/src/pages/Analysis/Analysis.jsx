import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import Age from './components/Age';
import Education from './components/Education';
import Performance from './components/Performance';
import Assets from './components/Assets';

const { Row, Col } = Grid;

export default class Analysis extends Component {
  render() {
    return (
      <Row gutter="20" wrap>
        <Col l="12">
          <Performance />
        </Col>
        <Col l="12">
          <Assets />
        </Col>
        <Col l="12">
          <Education />
        </Col>
        <Col l="12">
          <Age />
        </Col>
      </Row>
    );
  }
}
