import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import CustomTable from './CustomTable';
import PirChart from './PieChart';

const { Row, Col } = Grid;

export default class TableChartCard extends Component {
  static displayName = 'TableChartCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={styles.container}>
        <h4 style={styles.title}>
          <FormattedMessage id="app.base.table.title" />
        </h4>
        <Row wrap>
          <Col l="8">
            <PirChart />
          </Col>
          <Col l="16">
            <CustomTable />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  title: {
    margin: '0 0 20px',
    padding: '15px 20px',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
    borderBottom: '1px solid #f0f0f0',
  },
};
