import React, { Component } from 'react';
import { Grid } from '@icedesign/base';
import AssetCard from '../AssetCard';
import BudgetCard from '../BudgetCard';

const { Row, Col } = Grid;

export default class Overview extends Component {
  static displayName = 'Overview';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter="20">
        <Col l="12">
          <AssetCard />
        </Col>
        <Col l="12">
          <BudgetCard />
        </Col>
      </Row>
    );
  }
}
