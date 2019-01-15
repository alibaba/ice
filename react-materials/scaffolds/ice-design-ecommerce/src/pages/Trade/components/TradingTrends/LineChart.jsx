import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

export default class LineChart extends React.Component {
  render() {
    const data = [
      {
        month: 'Jan',
        下单笔数: 7.0,
        退货笔数: 3.9,
      },
      {
        month: 'Feb',
        下单笔数: 6.9,
        退货笔数: 4.2,
      },
      {
        month: 'Mar',
        下单笔数: 9.5,
        退货笔数: 5.7,
      },
      {
        month: 'Apr',
        下单笔数: 14.5,
        退货笔数: 8.5,
      },
      {
        month: 'May',
        下单笔数: 18.4,
        退货笔数: 11.9,
      },
      {
        month: 'Jun',
        下单笔数: 21.5,
        退货笔数: 15.2,
      },
      {
        month: 'Jul',
        下单笔数: 25.2,
        退货笔数: 17.0,
      },
      {
        month: 'Aug',
        下单笔数: 26.5,
        退货笔数: 16.6,
      },
      {
        month: 'Sep',
        下单笔数: 23.3,
        退货笔数: 14.2,
      },
      {
        month: 'Oct',
        下单笔数: 18.3,
        退货笔数: 10.3,
      },
      {
        month: 'Nov',
        下单笔数: 13.9,
        退货笔数: 6.6,
      },
      {
        month: 'Dec',
        下单笔数: 9.6,
        退货笔数: 4.8,
      },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['下单笔数', '退货笔数'],
      // 展开字段集
      key: 'city',
      // key字段
      value: 'temperature', // value字段
    });
    console.log(dv);
    const cols = {
      month: {
        range: [0, 1],
      },
    };
    return (
      <div>
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
      </div>
    );
  }
}
