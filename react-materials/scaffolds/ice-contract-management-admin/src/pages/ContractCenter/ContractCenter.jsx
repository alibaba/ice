import React, { Component } from 'react';
import { Grid } from '@icedesign/base';
import SearchContract from './components/SearchContract';
import SearchHistory from './components/SearchHistory';

const { Row, Col } = Grid;

export default class ContractCenter extends Component {
  static displayName = 'ContractCenter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row gutter={20} wrap>
        <Col l="18">
          <SearchContract />
        </Col>
        <Col l="6">
          <SearchHistory />
        </Col>
      </Row>
    );
  }
}
