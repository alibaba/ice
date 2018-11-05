import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

class DevicePieChart extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: 'Chrome',
        count: 60,
      },
      {
        item: 'Safari',
        count: 20,
      },
      {
        item: 'Firefox',
        count: 10,
      },
      {
        item: 'IE',
        count: 10,
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
          val = `${val * 100}%`;
          return val;
        },
      },
    };
    return (
      <div>
        <Chart height={260} data={dv} scale={cols} padding={[10]} forceFit>
          <Coord type="theta" radius={0.7} />
          <Axis name="percent" />
          <Legend position="bottom" offsetY={-260 / 2 + 100} offsetX={-20} />
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
          >
            <Label
              content="percent"
              offset={-40}
              textStyle={{
                rotate: 0,
                textAlign: 'center',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)',
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default DevicePieChart;
