import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import IceContainer from '@icedesign/container';

export default class Statistics extends React.Component {
  render() {
    const data = [
      {
        salary: 'Month',
        year: 'Q1',
        value: 163,
      },
      {
        salary: 'Month',
        year: 'Q2',
        value: 203,
      },
      {
        salary: 'Month',
        year: 'Q3',
        value: 276,
      },
      {
        salary: 'Month',
        year: 'Q4',
        value: 408,
      },
      {
        salary: 'Year',
        year: 'Q1',
        value: 263,
      },
      {
        salary: 'Year',
        year: 'Q2',
        value: 103,
      },
      {
        salary: 'Year',
        year: 'Q3',
        value: 176,
      },
      {
        salary: 'Year',
        year: 'Q4',
        value: 208,
      },
    ];
    const ds = new DataSet();
    const dv = ds
      .createView()
      .source(data)
      .transform({
        type: 'percent',
        field: 'value',
        // 统计销量
        dimension: 'salary',
        // 每年的占比
        groupBy: ['year'],
        // 以不同产品类别为分组
        as: 'percent',
      });
    const cols = {
      percent: {
        min: 0,

        formatter(val) {
          return `${(val * 100).toFixed(0)}K`;
        },
      },
    };
    return (
      <IceContainer title="费用概览">
        <Chart height={338} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="year" />
          <Axis name="percent" />
          <Tooltip />
          <Geom type="intervalStack" position="year*percent" color="salary" />
        </Chart>
      </IceContainer>
    );
  }
}
