import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import Card from './Card';
import Analysis from './Analysis';
import Statistics from './Statistics';

const { Row, Col } = Grid;

const cardData = {
  employee: [
    {
      label: '新增员工',
      value: '89',
      icon: 'cascades',
    },
    {
      label: '总员工数',
      value: '1234',
      icon: 'person',
    },
  ],
  interview: [
    {
      label: '面试人数',
      value: '18',
      icon: 'edit2',
    },
    {
      label: '待入职数',
      value: '6',
      icon: 'task',
    },
  ],
};

export default class Overview extends Component {
  render() {
    return (
      <Row wrap gutter="20">
        <Col l="7">
          <Card data={cardData.employee} />
          <Card data={cardData.interview} />
        </Col>
        <Col l="7">
          <Analysis />
        </Col>
        <Col l="10">
          <Statistics />
        </Col>
      </Row>
    );
  }
}
