import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@icedesign/base';
import LineChart from './LineChart';
import './TrendAnalysis.scss';

const TabPane = Tab.TabPane;

export default class TrendAnalysis extends Component {
  static displayName = 'TrendAnalysis';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = (value) => {
    console.log('handleClick:', value);
  };

  render() {
    const data = [
      {
        month: '一月',
        Health: 5.9,
        Table: 1.9,
      },
      {
        month: '二月',
        Health: 6.0,
        Table: 2.0,
      },
      {
        month: '三月',
        Health: 6.0,
        Table: 2.0,
      },
      {
        month: '四月',
        Health: 6.0,
        Table: 2.0,
      },
      {
        month: '五月',
        Health: 6.0,
        Table: 2.0,
      },
      {
        month: '六月',
        Health: 6.0,
        Table: 2.0,
      },
      {
        month: '七月',
        Health: 6.0,
        Table: 2.0,
      },
      {
        month: '八月',
        Health: 6.0,
        Table: 2.0,
      },
      {
        month: '九月',
        Health: 6.0,
        Table: 2.0,
      },
      {
        month: '十月',
        Health: 6.0,
        Table: 2.0,
      },
      {
        month: '十一月',
        Health: 6.0,
        Table: 2.0,
      },
      {
        month: '十二月',
        Health: 6.0,
        Table: 2.0,
      },
    ];

    const fields = ['Health', 'Table'];

    return (
      <IceContainer style={styles.container} className="trend-analysis">
        <h4 style={styles.title}>趋势分析</h4>
        <Tab type="text" size="small">
          <TabPane tab="计算数据" key="1">
            <LineChart
              onChange={this.handleClick}
              fields={fields}
              data={data}
              buttons={[
                {
                  text: '计算健康度',
                  value: 'calculateHealth',
                },
                {
                  text: '计算消耗',
                  value: 'calculateMemory',
                },
                {
                  text: '计算费用',
                  value: 'calculateCosts',
                },
              ]}
            />
          </TabPane>
          <TabPane tab="存储数据" key="2">
            <LineChart
              onChange={this.handleClick}
              fields={fields}
              data={data}
              buttons={[
                {
                  text: '存储健康度',
                  value: 'storageHealth',
                },
                {
                  text: '存储量',
                  value: 'storageMemory',
                },
                {
                  text: '存储费用',
                  value: 'storageCosts',
                },
              ]}
            />
          </TabPane>
          <TabPane tab="表及任务数据" key="3">
            <LineChart
              onChange={this.handleClick}
              fields={fields}
              data={data}
              buttons={[
                {
                  text: '表数',
                  value: 'table',
                },
                {
                  text: '任务数',
                  value: 'tasks',
                },
              ]}
            />
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
