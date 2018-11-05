import React, { Component } from 'react';
import Card from './Card';
import BarChart from './BarChart';

const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      name: `${index + 1}. 造物节`,
      num: parseInt(Math.random() * 1000),
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
        title: '空间名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '发布活动数',
        dataIndex: 'num',
        key: 'num',
      },
    ];

    return (
      <Card
        title="最新发布活动"
        subTitle="最近7日TOP 10"
        summary={[
          { label: '本周发布活动数', value: '123' },
          { label: '上周发布活动数', value: '349' },
          { label: '累计发布活动数', value: '23,239' },
        ]}
        link={{ text: '发布活动明细', href: '#' }}
        dataSource={dataSource}
        columns={columns}
        content={<BarChart />}
      />
    );
  }
}
