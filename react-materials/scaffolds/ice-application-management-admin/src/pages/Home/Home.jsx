import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import './Home.scss';

import ServiceCard from './components/ServiceCard';
import PublishTime from './components/PublishTime';
import PublishCount from './components/PublishCount';
import AccuracyRate from './components/AccuracyRate';
import PublishList from './components/PublishList';

const { Row, Col } = Grid;
export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home">
        <ServiceCard />
        <Row wrap gutter="20">
          <Col l="8">
            <PublishTime />
          </Col>
          <Col l="8">
            <PublishCount />
          </Col>
          <Col l="8">
            <AccuracyRate />
          </Col>
        </Row>
        <PublishList />
      </div>
    );
  }
}
