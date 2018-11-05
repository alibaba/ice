import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  Guide,
} from 'bizcharts';
import DataSet from '@antv/data-set';

class Donut extends React.Component {
  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const data = [
      {
        item: '缺省页',
        count: 45,
      },
      {
        item: '列表页',
        count: 25,
      },
      {
        item: '表单',
        count: 30,
      },
    ];
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
          val = val * 100 + '%';
          return val;
        },
      },
    };
    return (
      <Chart
        height={400}
        data={dv}
        scale={cols}
        padding={[80, 100, 80, 80]}
        forceFit
      >
        <Coord type="theta" radius={0.75} innerRadius={0.6} />
        <Axis name="percent" />
        <Legend position="bottom" offsetY={-10} offsetX={0} />
        <Tooltip
          showTitle={false}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
        />
        <Geom
          type="intervalStack"
          position="percent"
          color="item"
          tooltip={[
            'item*percent',
            (item, percent) => {
              percent = percent * 100 + '%';
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
