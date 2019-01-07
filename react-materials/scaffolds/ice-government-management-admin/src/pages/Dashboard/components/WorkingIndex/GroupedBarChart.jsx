import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

const mock = [
  {
    name: '实际指标',
    执限内执结率: 40,
    实际执行率: 71,
    执行终结率: 40,
  },
  {
    name: '平均指标',
    执限内执结率: 36,
    实际执行率: 60,
    执行终结率: 52,
  },
];

const ds = new DataSet();
const dv = ds.createView().source(mock);
dv.transform({
  type: 'fold',
  fields: ['执限内执结率', '实际执行率', '执行终结率'],
  key: '工作指标',
  value: '完成率',
});

export default class GroupedBarChart extends Component {
  formatAxis = (text) => {
    return `${text}%`;
  };

  onTooltipChange = (event) => {
    event.items.forEach((item) => {
      item.value += '%';
    });
  };

  render() {
    return (
      <Chart
        width={280}
        height={220}
        data={dv}
        padding={[40, 8, 40, 40]}
        onTooltipChange={this.onTooltipChange}
      >
        <Axis
          name="工作指标"
          label={{
            offset: 4,
            textStyle: {
              textAlign: 'center',
              fill: '#666',
              fontSize: '12',
              fontWeight: 'normal',
              rotate: 0,
              textBaseline: 'top',
            },
            autoRotate: false,
          }}
        />
        <Axis
          name="完成率"
          label={{
            formatter: this.formatAxis,
          }}
        />
        <Legend position="top-center" />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom
          type="interval"
          position="工作指标*完成率"
          color={['name', ['#5e83fb', '#58ca9a']]}
          adjust={[
            {
              type: 'dodge',
              marginRatio: 1 / 32,
            },
          ]}
        />
      </Chart>
    );
  }
}
