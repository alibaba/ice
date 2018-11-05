import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@icedesign/base';
import LineChart from './LineChart';
import './CostTrend.scss';

const TabPane = Tab.TabPane;

export default class CostTrend extends Component {
  static displayName = 'CostTrend';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={styles.container} className="cost-trend">
        <h4 style={styles.title}>费用趋势</h4>
        <Tab type="text" size="small">
          <TabPane tab="总费用" key="1">
            <LineChart />
          </TabPane>
          <TabPane tab="计算费用" key="2">
            <LineChart />
          </TabPane>
        </Tab>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  title: {
    margin: '0',
    padding: '15px 20px',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
    borderBottom: '1px solid #f0f0f0',
  },
};
