import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class UserTrend extends Component {
  render() {
    const data = [
      {
        name: '北京',
        'Jan.': 88,
        'Feb.': 28,
        'Mar.': 39,
        'Apr.': 2,
        'May.': 2,
        'Jun.': 0,
        'Jul.': 0,
        'Aug.': 0,
      },
      {
        name: '杭州',
        'Jan.': 72,
        'Feb.': 23,
        'Mar.': 34,
        'Apr.': 2,
        'May.': 2,
        'Jun.': 0,
        'Jul.': 0,
        'Aug.': 0,
      },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.'],
      // 展开字段集
      key: 'month',
      // key字段
      value: 'user', // value字段
    });

    return (
      <IceContainer>
        <ContainerTitle title="连续活跃用户对比" />
        <Chart height={400} data={dv} forceFit padding={[40]}>
          <Axis name="month" />
          <Axis name="user" />
          <Legend />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="interval"
            position="month*user"
            color={['name', ['#5e83fb', '#58ca9a']]}
            adjust={[
              {
                type: 'dodge',
                marginRatio: 1 / 32,
              },
            ]}
          />
        </Chart>
      </IceContainer>
    );
  }
}
