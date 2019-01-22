import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab, Grid } from '@alifd/next';
import SeriesLine from './SeriesLine';
import BasicLine from './BasicLine';
import Users from '../Users';

const { Row, Col } = Grid;
const TabPane = Tab.Item;

export default class TabChart extends Component {
  handleChange = (key) => {
    console.log('change', key);
  };

  render() {
    return (
      <Row gutter="20">
        <Col l="18">
          <IceContainer style={styles.card}>
            <Tab onChange={this.handleChange}>
              <TabPane key="1" title="销售走势">
                <SeriesLine />
              </TabPane>
              <TabPane key="2" title="成交趋势">
                <BasicLine />
              </TabPane>
            </Tab>
          </IceContainer>
        </Col>
        <Col l="6">
          <Users />
        </Col>
      </Row>
    );
  }
}

const styles = {
  card: {
    padding: '0 20px',
  },
};
