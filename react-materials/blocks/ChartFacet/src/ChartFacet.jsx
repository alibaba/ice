import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import CustomChart from './CustomChart';

const { Row, Col } = Grid;

export default class ChartFacet extends Component {
  static displayName = 'ChartFacet';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="chart-facet">
        <IceContainer>
          <h4 style={styles.title}>分面图</h4>
          <Row wrap>
            <Col xxs="24" l="12">
              <CustomChart />
            </Col>
            <Col xxs="24" l="12">
              <CustomChart />
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0 0 20px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
};
