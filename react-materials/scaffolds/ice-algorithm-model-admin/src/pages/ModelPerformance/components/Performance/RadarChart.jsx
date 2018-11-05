import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

class Withline extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: '指标一',
        TNR: 70,
        TPR: 30,
      },
      {
        item: '指标二',
        TNR: 60,
        TPR: 70,
      },
      {
        item: '指标三',
        TNR: 50,
        TPR: 60,
      },
      {
        item: '指标四',
        TNR: 40,
        TPR: 50,
      },
      {
        item: '指标五',
        TNR: 60,
        TPR: 70,
      },
      {
        item: '指标六',
        TNR: 70,
        TPR: 50,
      },
      {
        item: '指标七',
        TNR: 50,
        TPR: 40,
      },
      {
        item: '指标八',
        TNR: 30,
        TPR: 40,
      },
      {
        item: '指标九',
        TNR: 60,
        TPR: 40,
      },
      {
        item: '指标十',
        TNR: 50,
        TPR: 60,
      },
    ];
    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['TPR', 'TNR'],
      // 展开字段集
      key: 'user',
      // key字段
      value: 'score', // value字段
    });
    const cols = {
      score: {
        min: 0,
        max: 80,
      },
    };
    return (
      <div>
        <Chart
          height={400}
          data={dv}
          padding={[20, 20, 95, 20]}
          scale={cols}
          forceFit
        >
          <Coord type="polar" radius={0.8} />
          <Axis
            name="item"
            line={null}
            tickLine={null}
            grid={{
              lineStyle: {
                lineDash: null,
              },
              hideFirstLine: false,
            }}
          />
          <Tooltip />
          <Axis
            name="score"
            line={null}
            tickLine={null}
            grid={{
              type: 'polygon',
              lineStyle: {
                lineDash: null,
              },
              alternateColor: 'rgba(0, 0, 0, 0.04)',
            }}
          />
          <Legend name="user" marker="circle" offset={30} />
          <Geom type="line" position="item*score" color="user" size={2} />
          <Geom
            type="point"
            position="item*score"
            color="user"
            shape="circle"
            size={4}
            style={{
              stroke: '#fff',
              lineWidth: 1,
              fillOpacity: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Withline;
