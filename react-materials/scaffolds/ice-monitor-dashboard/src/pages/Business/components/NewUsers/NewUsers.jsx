import React, { Component } from 'react';
import Card from '../Card';
import LineChart from './LineChart';

const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      name: `${index + 1}. 云栖大会`,
      num: parseInt(Math.random() * 10000, 10),
    };
  });
};

export default class LatestActivity extends Component {
  static displayName = 'LatestActivity';

  static propTypes = {};

  static defaultProps = {};

  render() {
    const dataSource = getData();
    const columns = [
      {
        title: 'TOP 空间',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '新增用户数',
        dataIndex: 'num',
        key: 'num',
      },
    ];

    return (
      <Card
        title="新增用户"
        subTitle="最近7日TOP 10"
        summary={[
          { label: '本周新增用户数', value: '394,234' },
          { label: '上周新增用户数', value: '129,392' },
          { label: '累积用户数', value: '984,128' },
        ]}
        link={{ text: '新增用户明细', to: '/user/statistics' }}
        dataSource={dataSource}
        columns={columns}
        content={<LineChart />}
      />
    );
  }
}
