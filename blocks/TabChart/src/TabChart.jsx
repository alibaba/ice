import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@icedesign/base';
import SeriesLine from './SeriesLine';
import BasicLine from './BasicLine';
import './TabChart.scss';

const TabPane = Tab.TabPane;

export default class TabChart extends Component {
  static displayName = 'TabChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (key) => {
    console.log('change', key);
  };

  render() {
    return (
      <div className="tab-chart">
        <IceContainer style={styles.card}>
          <Tab onChange={this.handleChange}>
            <TabPane key="1" tab="收益走势">
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
  card: {
    marginBottom: '0',
    padding: '0 20px',
  },
};
