import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';

class Donut extends React.Component {
  render() {
    const { text = '预约付款金额', data = [] } = this.props;
    const { DataView } = DataSet;
    const { Html } = Guide;
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val) => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };
    return (
      <Chart height={260} data={dv} scale={cols} padding={[10]} forceFit>
        <Coord type="theta" radius={0.8} innerRadius={0.7} />
        <Axis name="percent" />
        <Legend
          position="right"
          offsetY={-90}
          offsetX={-140}
          formatter={(val) => {
            return val;
          }}
        />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Guide>
          <Html
            position={['50%', '50%']}
            html={`<div style="color:#999;font-size:12px;text-align: center;">${text}<br><span style="color:#333;font-size:20px">0.00</span></div>`}
            alignX="middle"
            alignY="middle"
          />
        </Guide>
        <Geom
          type="intervalStack"
          position="percent"
          color="item"
          tooltip={[
            'item*percent',
            (item, percent) => {
              percent = `${percent * 100}%`;
              return {
                name: item,
                value: percent,
              };
            },
          ]}
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
        />
      </Chart>
    );
  }
}

export default Donut;
