import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import IceContainer from '@icedesign/container';

export default class SalaryChart extends React.Component {
  render() {
    const data = [
      {
        month: 'Jan',
        Beijing: 7.0,
        Shanghai: 3.9,
      },
      {
        month: 'Feb',
        Beijing: 6.9,
        Shanghai: 4.2,
      },
      {
        month: 'Mar',
        Beijing: 9.5,
        Shanghai: 5.7,
      },
      {
        month: 'Apr',
        Beijing: 14.5,
        Shanghai: 8.5,
      },
      {
        month: 'May',
        Beijing: 18.4,
        Shanghai: 11.9,
      },
      {
        month: 'Jun',
        Beijing: 21.5,
        Shanghai: 15.2,
      },
      {
        month: 'Jul',
        Beijing: 25.2,
        Shanghai: 17.0,
      },
      {
        month: 'Aug',
        Beijing: 26.5,
        Shanghai: 16.6,
      },
      {
        month: 'Sep',
        Beijing: 23.3,
        Shanghai: 14.2,
      },
      {
        month: 'Oct',
        Beijing: 18.3,
        Shanghai: 10.3,
      },
      {
        month: 'Nov',
        Beijing: 13.9,
        Shanghai: 6.6,
      },
      {
        month: 'Dec',
        Beijing: 9.6,
        Shanghai: 4.8,
      },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['Beijing', 'Shanghai'],
      // 展开字段集
      key: 'city',
      // key字段
      value: 'temperature', // value字段
    });
    const cols = {
      month: {
        range: [0, 1],
      },
    };
    return (
      <IceContainer title="薪资趋势">
        <Chart height={400} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}`,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color="city"
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape="circle"
            color="city"
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </IceContainer>
    );
  }
}
