import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@icedesign/base';
import SeriesLine from './SeriesLine';
import BasicLine from './BasicLine';

const TabPane = Tab.TabPane;

export default class TabChart extends Component {
  handleChange = (key) => {
    console.log('change', key);
  };

  render() {
    return (
      <div className="tab-chart" style={styles.container}>
        <IceContainer style={styles.card}>
          <Tab onChange={this.handleChange}>
            <TabPane key="1" tab="销售走势">
              <SeriesLine />
            </TabPane>
            <TabPane key="2" tab="成交趋势">
              <BasicLine />
            </TabPane>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    marginBottom: '20px',
  },
  card: {
    padding: '0 20px',
  },
};
