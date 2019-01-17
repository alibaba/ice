import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Guide } from 'bizcharts';
import { DataView } from '@antv/data-set';

const { Html } = Guide;

export default class PieDonutChart extends Component {
  static displayName = 'PieDonutChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [
      { item: '20~24岁', count: 40 },
      { item: '16~20岁', count: 21 },
      { item: '25~28岁', count: 19 },
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
      <Chart
        height={200}
        data={dv}
        scale={cols}
        padding={[10, 10, 20, 10]}
        forceFit
      >
        <Coord type="theta" radius={0.9} innerRadius={0.6} />
        <Axis name="percent" />
        <Legend position="bottom" offsetY={-14} itemGap={3} />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Guide>
          <Html
            position={['50%', '50%']}
            html='<div style="color:#8c8c8c;font-size:12px;text-align: center;width: 10em;">年龄</div>'
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
          style={{ lineWidth: 1, stroke: '#fff' }}
        />
      </Chart>
    );
  }
}
