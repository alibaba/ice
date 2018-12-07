import React, { Component } from 'react';
import { Grid } from '@icedesign/base';

import PublishTime from './components/PublishTime';
import PublishCount from './components/PublishCount';
import AccuracyRate from './components/AccuracyRate';

import PublishList from './components/PublishList';

import './History.scss';

const { Row, Col } = Grid;
export default class History extends Component {
  static displayName = 'History';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="history-page" >
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
