import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@icedesign/base';
import LineChart from './LineChart';
import Head from './Head';
import './YearsAnalysis.scss';

const TabPane = Tab.TabPane;

// MOCK 数据，实际业务按需进行替换
const MOCK_DATA = {
  memory: {
    monthRate: '1.88',
    monthAmount: '1234.56',
    dayRate: '0.66',
    dayAmount: '23',
  },
  calculate: {
    monthRate: '2.99',
    monthAmount: '5678.99',
    dayRate: '0.77',
    dayAmount: '45',
  },
  cost: {
    monthRate: '3.66',
    monthAmount: '8765.43',
    dayRate: '0.88',
    dayAmount: '67',
  },
};
export default class YearsAnalysis extends Component {
  static displayName = 'YearsAnalysis';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={styles.container} className="years-analysis">
        <h4 style={styles.title}>财年分析</h4>
        <Tab type="text" size="small">
          <TabPane tab="存储" key="1">
            <Head data={MOCK_DATA.memory} />
            <LineChart />
          </TabPane>
          <TabPane tab="计算" key="2">
            <Head data={MOCK_DATA.calculate} />
            <LineChart />
          </TabPane>
          <TabPane tab="成本" key="3">
            <Head data={MOCK_DATA.cost} />
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
