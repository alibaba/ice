import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import LineChart from './LineChart';
import Head from './Head';
import './PerformanceChart.scss';

const TabPane = Tab.Item;

const MOCK_DATA = {
  all: {
    day: '677.00',
    month: '3621.00',
    target: '10000.00',
    percent: '30',
  },
  online: {
    day: '1286.00',
    month: '2836.00',
    target: '5000.00',
    percent: '61',
  },
  offline: {
    day: '892.00',
    month: '1928.00',
    target: '5000.00',
    percent: '28',
  },
};
export default class PerformanceChart extends Component {
  static displayName = 'PerformanceChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer className="flow-statistics">
        <h4 style={styles.title}>销售业绩</h4>
        <Tab shape="text" size="small">
          <TabPane title="全店" key="1">
            <Head data={MOCK_DATA.all} />
            <LineChart />
          </TabPane>
          <TabPane title="网店" key="2">
            <Head data={MOCK_DATA.online} />
            <LineChart />
          </TabPane>
          <TabPane title="门店" key="3">
            <Head data={MOCK_DATA.offline} />
            <LineChart />
          </TabPane>
        </Tab>
      </IceContainer>
    );
  }
}

const styles = {
  title: {
    margin: '0',
    fontSize: '16px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    color: '#333',
  },
};
