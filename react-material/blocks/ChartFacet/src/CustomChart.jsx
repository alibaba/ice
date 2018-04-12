import React, { Component } from 'react';
import { Chart, Tooltip, Facet, Legend, Coord } from 'bizcharts';
import { DataView } from '@antv/data-set';

export default class CustomChart extends Component {
  static displayName = 'CustomChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    const data = [
      { gender: '男', count: 40, class: '一班', grade: '一年级' },
      { gender: '女', count: 30, class: '一班', grade: '一年级' },
      { gender: '男', count: 35, class: '二班', grade: '一年级' },
      { gender: '女', count: 45, class: '二班', grade: '一年级' },
      { gender: '男', count: 20, class: '三班', grade: '一年级' },
      { gender: '女', count: 35, class: '三班', grade: '一年级' },
      { gender: '男', count: 30, class: '一班', grade: '二年级' },
      { gender: '女', count: 40, class: '一班', grade: '二年级' },
      { gender: '男', count: 25, class: '二班', grade: '二年级' },
      { gender: '女', count: 32, class: '二班', grade: '二年级' },
      { gender: '男', count: 28, class: '三班', grade: '二年级' },
      { gender: '女', count: 36, class: '三班', grade: '二年级' },
    ];

    const scale = {
      cut: {
        sync: true,
      },
      mean: {
        sync: true,
        tickCount: 5,
      },
    };

    return (
      <Chart data={data} height={400} scale={scale}>
        <Tooltip showTitle={false} />
        <Legend />
        <Coord type="theta" />
        <Facet
          type="tree"
          fields={['grade', 'class']}
          line={{ stroke: '#c0d0e0' }}
          lineSmooth
          eachView={(view, facet) => {
            const data2 = facet.data;
            const dv = new DataView();
            dv.source(data2).transform({
              type: 'percent',
              field: 'count',
              dimension: 'gender',
              as: 'percent',
            });
            view.source(dv, {
              percent: {
                formatter(val) {
                  return `${(val * 100).toFixed(2)}%`;
                },
              },
            });
            view
              .intervalStack()
              .position('percent')
              .color('gender');
          }}
        />
      </Chart>
    );
  }
}
